<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\User;

class ChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

  

    public $message;
    public $user;

    public function __construct($message,User $user)
    {
        $this->message=$message;
        $this->user=$user->name;
        $this->dontBroadcastToCurrentUser();
    }

    
    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }
}
