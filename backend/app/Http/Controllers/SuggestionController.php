<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User, App\Suggestion;
use Request, DB;


class SuggestionController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
    {
        $instanceId = 1;

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
	public function store()
	{
	    $citizenInput = Request::input('citizen');

        $suggestionInput = Request::input('suggestion');

        $instanceId = 1;

        $userByEmail = User::where('email','=',$citizenInput['email'])->first();
        if(isset($user))
        {
            $user = User::find($userByEmail->email);
            $user->name = $citizenInput['name'];
            $user->mobile = $citizenInput['mobile'];
            $user->instance_id = $instanceId;
            $userSaveSuccess = $user->save();
        }
        else
        {
            $user = new User;
            $user->email = $citizenInput['email'];
            $user->name = $citizenInput['name'];
            $user->mobile = $citizenInput['mobile'];
            $user->instance_id = $instanceId;
            $userSaveSuccess = $user->save();
        }

        if(isset($userSaveSuccess))
        {
            $suggestion = new Suggestion;
            $suggestion->instance_id = $instanceId;
            $suggestion->user_id = $user->id;
            $suggestion->city_function_id = $suggestionInput['work_id'];
            $suggestion->zone_division_id = $suggestionInput['division_id'];
            $suggestion->suggestion = $suggestionInput['suggestion'];
            $suggestion->status = 'citizen_submitted';
            $suggestionSaveSuccess = $suggestion->save();
        }
        else
        {
            return $this->respond(null,null,'Failed to save user',null,'User saving error');

        }
        if (isset($suggestionSaveSuccess)) {
            $emailData = array(
                'citizenName' => $user->name,
                'email' => $user->email,
                'suggestion' => $suggestion->suggestion
            );
            $this->sendMail($emailData, 'emails.suggestion.submitSuggestion', 'Participatory Budgeting');
        }
        return $this->respond($suggestionSaveSuccess,'Suggestion saved successfully','could not save suggestion',$suggestion,'suggestion error');

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
