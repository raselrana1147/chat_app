<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
         <meta name="csrf-token" content="{{ csrf_token() }}">


        <title>Laravel</title>

      
            <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
            <style>
                .list-group{
                    overflow-y: auto;;
                    height: 300px;
                }
            </style>
      
    </head>
    <body>
        <div class="container">
            <div class="row" id="app">
                <div class="offset-2 col-6">
                 <li class="list-group-item active" aria-current="true">Chat Room
                    <span class="badge badge-danger badge-pill" style="font-size: 14px;margin-left: 5px">@{{numOfUser}}</span>
                 </li>
                  <ul class="list-group" v-chat-scroll>
                   <message v-for="sms,index in chat.message" :key="sms.index"
                   :color="chat.color[index]" :user="chat.user[index]" :time="chat.time[index]">@{{sms}}</message>
                </ul>
                 <p class="badge badge-success badge-pill">@{{ typing }}</p>
                 <input type="text" name="" @keyup.enter="send" class="form-control" v-model="message">

                 <a href='' class="btn btn-warning btn-sm" @click.prevent='deleteSession'>Delete Chats</a>
            </div>
            </div>
        </div>
     
     <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
