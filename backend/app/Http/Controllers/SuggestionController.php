<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User, App\Suggestion, App\Instance;
use Request, DB, Log, Storage;
use PDF;
use App\Http\Requests\SaveSuggestionRequest;
use App\Http\Requests\ShowSuggestionByUserRequest;


class SuggestionController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
    {
        $instanceId = Request::input('instance_id');

        $suggestion = DB::table('suggestions')
            ->join('zones', 'suggestions.zone_division_id', '=', 'zones.id')
            ->join('users', 'suggestions.user_id', '=', 'users.id')
            ->join('city_functions', 'suggestions.city_function_id', '=', 'city_functions.id')
            ->join('instances', 'instances.id', '=', 'suggestions.instance_id')
            ->join('cities', 'cities.id', '=', 'instances.city_id')
            ->where('suggestions.instance_id', '=', $instanceId)
            ->select('cities.name as city_name', 'zones.name as zone_name',
                'zones.division_name as division_name', 'users.name as citizen_name', 'suggestions.suggestion', 'city_functions.function as work_name')
            ->get();
        return $this->respond($suggestion,"Suggestions retrieved successfully",'Suggestions could not be retrieved',$suggestion,"no suggestion");
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(SaveSuggestionRequest $request)
	{
        $suggestionInput = Request::all();

        $suggestion = new Suggestion;
        $suggestion->instance_id = $request->input('instance_id', null);;
        $suggestion->user_id = $request->input('user_id', null);
        $suggestion->city_function_id = $request->input('work_id', null);
        $suggestion->zone_division_id = $request->input('division_id', null);
        $suggestion->area = $request->input('area', null);
        $suggestion->suggestion = $request->input('suggestion', null);
        $suggestion->work_purpose = $request->input('work_purpose', null);
        $suggestion->status = 'submitted';
        $suggestionSaveSuccess = $suggestion->save();

        $instance = Instance::find($suggestion->instance_id);

        $user = User::find($suggestion->user_id);
        if (isset($suggestionSaveSuccess)) {
            $emailData = array(
                'instance'=>$instance,
                'suggestion'=>$suggestion,
                'user'=>$user,
                'email'=>$user->email
            );
            $this->generateReceipt($user, $suggestion);
            $this->sendMail($emailData, 'emails.suggestion.submitSuggestion',
                'Participatory Budgeting',$suggestion->id.'.pdf');
        }
        return $this->respond($suggestion,'Suggestion saved successfully','could not save suggestion',$suggestion,'suggestion error');

	}

    public function generateReceipt( $user, $suggestion )
    {
        $instance = Instance::find($suggestion->instance_id);

        $receiptData = array(
          'instance'=>$instance,
            'suggestion'=>$suggestion,
            'user'=>$user
        );
        $pdf = PDF::loadView('receipt.suggestionReceipt', $receiptData);
        Storage::put($suggestion->id.'.pdf', $pdf->output());
        return $pdf->getDomPDF();
    }

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

    public function getShowByUser(ShowSuggestionByUserRequest $request)
    {
        $instanceId =$request->input('instance_id', null);
        $userId = $request->input('user_id', null);

        $suggestion = DB::table('suggestions')
            ->join('zones', 'suggestions.zone_division_id', '=', 'zones.id')
            ->join('users', 'suggestions.user_id', '=', 'users.id')
            ->join('city_functions', 'suggestions.city_function_id', '=', 'city_functions.id')
            ->join('instances', 'instances.id', '=', 'suggestions.instance_id')
            ->join('cities', 'cities.id', '=', 'instances.city_id')
            ->where('suggestions.instance_id', '=', $instanceId)
            ->where('suggestions.user_id', '=', $userId)
            ->select('cities.name as city_name', 'zones.name as zone_name',
                'zones.division_name as division_name', 'users.name as citizen_name',
                'suggestions.suggestion'
                ,'city_functions.function as work_name')
            ->get();
        return $this->respond($suggestion,"Suggestions retrieved successfully",'Suggestions could not be retrieved',
            $suggestion,"no suggestion");
    }
	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
