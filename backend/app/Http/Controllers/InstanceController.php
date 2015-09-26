<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Instance;
use Log;

class InstanceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $instanceId = 1;

        $instance = Instance::find($instanceId);
        $city = $instance->city;
        array_merge( (array)$instance,(array)$city);
        return $this->respond($instance, 'Instances retrieved successfully', 'Instances can not be retrieved',$instance , null);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $instanceId
     * @return Response
     */
    public function show($instanceId)
    {
        $instance = Instance::find($instanceId);
        Log::info($instance);
        $city = $instance->city;
        array_merge( (array)$instance,(array)$city);
        return $this->respond($instance, 'Instances retrieved successfully', 'Instances can not be retrieved',$instance , null);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}
