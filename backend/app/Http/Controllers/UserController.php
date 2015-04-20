<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Request, Crypt;
use App\User;

class UserController extends Controller {

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

	}

	/**
	 * Store a newly created resource in storage.
	 * @param  StoreBlogPostRequest  $request
	 * @return Response
	 */
	public function store(Requests\SignUpRequest $request)
	{
        $input = Request::all();

        $user = new User;
        $user->email = $input['email'];
        $user->password = md5( $input['password'] );
        $user->role = $input['role'];
        $user->instance_id = 1;
        $saveStatus = $user->save();
        return $this->respond($saveStatus,'SignUp Successful',$user,'none');
	}


    public function login(Requests\LoginRequest $request)
    {
        $input = Request::all();

        $user = User::where('email','=',$input['email'])->where('password', '=', md5($input['password']))->first();

        return $this->respond($user,'SignUp Successful',$user,'Email id or password incorrect');
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
