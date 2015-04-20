<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Request;

class SuggestionController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
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

        $user = User::where('email','=',$citizenInput['email']);
        if(isset($user))
        {
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
            $suggestion->city_function_id = $suggestionInput['work']['id'];
            $suggestion->zone_division_id = $suggestionInput['division']['id'];
            $suggestion->suggestion = $suggestionInput['suggestion'];
            $suggestion->status = 'citizen_submitted';
            $suggestionSaveSuccess = $suggestion->save();
        }
        else
        {
            return $this->respond(null,null,'Failed to save user',null,'User saving error');

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
