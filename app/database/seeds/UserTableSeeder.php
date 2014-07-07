<?php

class UserTableSeeder extends Seeder {
    public function run(){
        DB::table('user')->delete();

        User::create(array(
            'party_id' => '1',
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin')
        ));
    }
}
?>