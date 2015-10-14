<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Request, Crypt;
use App\User;
use Log;

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
	public function store()
	{
		$citizenInput = Request::all();
        $user = User::updateOrCreate(array('email'=>$citizenInput['email']),$citizenInput);
		return $this->respond($user,'User saved successfully','could not save user',$user,'user error');
	}

    public function postForgetPassword()
    {
        $input = Request::all();
        $user = User::where('email','=',$input['email'])->first();
        if(empty($user))
        {
            return $this->respond($user,'Password sent successfully','could not send password',$user,'password forget error');

        }
        Log::info("in forget password");
        Log::info($user);
        $password = Crypt::decrypt($user->password);
        $emailData = array(
            'user'=>$user,
            'password' => $password,
            'email'=>$user->email
        );
        $this->sendMail($emailData, 'emails.authentication.forgetPassword',
            'Participatory Budgeting - Credentials');
        return $this->respond($user,'Password sent successfully','could not send password',$user,'password forget error');

    }

	public function postSignup(Requests\SignUpRequest $request)
	{
		$input = Request::all();
		$user = new User;
		$user->email = $input['email'];
		$user->name = $input['name'];
		$user->password = Crypt::encrypt( $input['password'] );
		$user->role = $input['role'];
		$user->instance_id = $input['instance_id'];
		$saveStatus = $user->save();

		return $this->respond($saveStatus,'Registration Successful !','SignUp Failed',$user,'none');
	}

    public function login(Requests\LoginRequest $request)
    {
        $input = Request::all();
        $user = User::where('email','=',$input['email'])->first();
        if(Crypt::decrypt($user->password) == (($input['password'])))
            return $this->respond($user,'Login Successful','Login failed',$user,'Email id or password incorrect');
        return $this->respond(null,'Login Successful','Login failed',$user,'Email id or password incorrect');
    }

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$user = User::find($id);
		return $this->respond($user,'User retrieval Successful','User can not be retrieved',$user,null);

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
