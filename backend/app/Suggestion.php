<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use App\City;

class Suggestion extends Model {



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'suggestions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','city_id','suggestion','instance_id',
        'zone_division_id','city_function_id','area','status', 'work_purpose',
    'name','email','mobile','address'];


    public function city_function()
    {
        return $this->hasOne('App\City_function','id','city_function_id');
    }

    public function zone()
    {
        return $this->hasOne('App\Zone','id','zone_division_id');
    }

    public function instance()
    {
        return $this->hasOne('App\Instance', 'id');
    }
}
