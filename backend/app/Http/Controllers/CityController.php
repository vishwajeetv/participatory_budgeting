<?php namespace App\Http\Controllers;

use App\City_function;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\City, App\Instance, App\Zone;
use Config;
use DB;
use Input;
use Log;
class CityController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $instance = 1;//TODO find a logic to get instance ID
        $city = Instance::find($instance)->first();

        if(isset($city->id))
        {
            $zones = DB::table('zones')->distinct()->groupBy('zone_id')->get();
            return $this->respond('$zones','Zones found','Zones couldnt be found',$zones,'no zone');
        }
        return $this->respond($city,'City found','Can not find zone for this instance',$city,'No city');

    }

	public function postShowZones()
	{
        $instanceId = Input::get('instance_id');
        $city = Instance::find($instanceId)->first();
        if(isset($city->id))
        {
            $zones = DB::table('zones')->distinct()->groupBy('zone_id')->get();
            return $this->respond('$zones','Zones found','Zones couldnt be found',$zones,'no zone');
        }
        return $this->respond($city,'City found','Can not find zone for this instance',$city,'No city');

    }


	public function getShowDivisions()
	{
		$zone_id = Input::get('zone_id');
        Log::info($zone_id);
		$zones = Zone::where('zone_id','=',$zone_id)->get();

        return $this->respond($zones,'Zones found','Zones couldnt be found',$zones,'no zone');

    }
    public function postShowWorks()
    {
        $instanceId = Input::get('instance_id');
        $instance = Instance::find($instanceId);
        Log::info($instance);
        if(isset($instance->id))
        {
            $functions = City_function::where('city_id','=',$instance->city_id)->get();
            return $this->respond('success','Works found','No works!',$functions,'no work');
        }
        return $this->respond(null,'City found','Can not find city for this instance',null,'No city');

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
