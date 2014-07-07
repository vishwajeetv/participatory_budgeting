<?php

class PartyTableSeeder extends Seeder {
    public function run(){
        DB::table('party')->delete();

        Party::create(array(
            'party_address' => 'b-2-94, Rail Vihar'

        ));

    }
}
?>