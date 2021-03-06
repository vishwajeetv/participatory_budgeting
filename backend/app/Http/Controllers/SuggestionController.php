<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Old_suggestion;
use App\User, App\Suggestion, App\Instance, App\City;
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
        Log::info($instanceId);
        $suggestion = DB::table('suggestions')
            ->join('zones', 'suggestions.zone_division_id', '=', 'zones.id')
            ->join('city_functions', 'suggestions.city_function_id', '=', 'city_functions.id')
            ->join('instances', 'instances.id', '=', 'suggestions.instance_id')
            ->where('suggestions.instance_id', '=', 2)
            ->select(
                'zones.zone_id as zone_id',
                'zones.division_name as division_name',
                'zones.division_id as division_id',
                'suggestions.name as citizen_name',
                'suggestions.address as citizen_address',
                'suggestions.mobile as citizen_mobile',
                'suggestions.email as citizen_email',
                'suggestions.receipt_number',
                'suggestions.suggestion',
                'suggestions.work_purpose','suggestions.mode',
                'city_functions.function as work_type')
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
        $citizenInfo = Request::input('citizen');

        $suggestion = new Suggestion;
        $suggestion->instance_id = $request->input('instance_id', null);
        $suggestion->inward_number = $request->input('inward_number',null);
        $suggestion->user_id = $request->input('user_id', null);
        $suggestion->city_function_id = $request->input('work_id', null);
        $suggestion->zone_division_id = $request->input('division_id', null);
        $suggestion->area = $request->input('area', null);
        $suggestion->suggestion = $request->input('suggestion', null);
        $suggestion->work_purpose = $request->input('work_purpose', null);
        $suggestion->status = 'saved';
        $suggestion->name = $citizenInfo['name'];
        $suggestion->email = $citizenInfo['email'];
        $suggestion->mobile = $citizenInfo['mobile'];
        $suggestion->address = $citizenInfo['address'];
        $suggestion->mode = $request->input('mode',null);
        $suggestionSaveSuccess = $suggestion->save();
        if($request->input('mode') == 'OFFLINE')
        {
            $suggestionSaved = Suggestion::find($suggestion->id);
            $suggestionSaved->receipt_number = $this->generateReceiptNumber( $suggestionSaved );
            $suggestionSaveSuccess = $suggestionSaved->save();
        }
        return $this->respond($suggestion,'Suggestion saved successfully','could not save suggestion',$suggestion,'suggestion error');

	}

    public function postSubmitSuggestion()
    {
        $suggestionId = Request::input('suggestion_id');
        $suggestion = Suggestion::findOrFail($suggestionId);
        $suggestion->status = 'submitted';
        $suggestion->receipt_number = $this->generateReceiptNumber( $suggestion );
        $suggestionSaveSuccess = $suggestion->save();

        if (isset($suggestionSaveSuccess)) {

            $instance = $suggestion->instance;
            $city_function = $suggestion->city_function;
            $zone = $suggestion->zone;

            $emailData = array(
                'instance'=>$instance,
                'suggestion'=>$suggestion,
                'zone' => $zone,
                'city_function' => $city_function,
                'email'=> $suggestion->email
            );
            $this->generateReceipt($emailData);
            $this->sendMail($emailData, 'emails.suggestion.submitSuggestion',
                'Participatory Budgeting',$suggestion->id.'.pdf');
        }
        return $this->respond($suggestionSaveSuccess,'Suggestion submitted successfully',
            'could not submit suggestion',$suggestion,'suggestion error');

    }

    public function generateReceiptNumber( $suggestion )
    {
        $paddedString = str_pad($suggestion->id, 6, '0', STR_PAD_LEFT);
        $instancePrefix = $suggestion->instance['receipt_prefix'];
        return $instancePrefix.$paddedString;
    }

    public function generateReceipt( $receiptData )
    {
        $pdf = PDF::loadView('receipt.suggestionReceipt', $receiptData);
        Storage::put($receiptData['suggestion']->id.'.pdf', $pdf->output());
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

    public function postSendOldSuggestionEmail()
    {
       $oldSuggestions = Old_suggestion::all();

        foreach($oldSuggestions as $oldSuggestion)
        {
            $emailData = array(
                'suggestion' => $oldSuggestion,
                'email' => $oldSuggestion->email
            );

            $this->sendMail($emailData, 'emails.suggestion.oldSuggestionReceipt',
                'Participatory Budgeting');
            $oldSuggestion->email_sent = 1;
            $oldSuggestion->save();

        }

        return $this->respond($emailData,'Suggestion submitted successfully',
            'could not submit suggestion',$emailData,'suggestion error');

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
