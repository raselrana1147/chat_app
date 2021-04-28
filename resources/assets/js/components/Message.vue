<template>
    <div>
        <li class="list-group-item text-right" :class="setSmsColor"><slot></slot>
            <span id="time">{{time}}</span>
        </li>
        <small class="badge float-right" :class="setBadgeColor">{{user}}</small>
    </div>
        
    
</template>

<script>
    export default {

        props:[
            'color',
            'user',
            'time'
        ],

        computed:{
            setSmsColor(){
                return 'list-group-item-'+this.color;
            },
             setBadgeColor(){
                return 'badge-'+this.color;
            }
        },
   
    }
</script>

<style>
    #time{
        font-size:9px;
        margin-top:10px;
        color:black;
        padding-left:10px;
    }
</style>
