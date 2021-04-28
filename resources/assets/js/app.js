

require('./bootstrap');

window.Vue = require('vue');

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/Message.vue'));

const app = new Vue({
    el: '#app',
    data(){
    	return{
    		message:'',
    		chat:{
    			message:[],
    			user:[],
    			color:[],
    			time:[],
    		},

    		typing:'',
    		numOfUser:0,
    	}
    },

    watch:{

    	message(){
    		Echo.private('chat')
    		    .whisper('typing', {
    		        name: this.message
    		    });
    	}

    },

    methods:{
    	send(){
    		if (this.message.length !=0) {
    			this.chat.message.push(this.message);
    			this.chat.user.push('You');
    			this.chat.color.push('success');
    			this.chat.time.push(this.get_time());
    			axios.post('/send',{

    				message:this.message,
    				chat:this.chat,

    			}).then(response=>{
    				this.message=''

    			}).catch(error=>{

    			});
    			this.message=''
    		}
    		
    	},

    	get_time(){
    		let time=new Date();
    		return time.getHours()+":"+time.getMinutes();
    	},

    	getOldMessages(){
    	    axios.post('/getOldMessage')
    	          .then(response => {
    	            console.log(response);
    	            if (response.data != '') {
    	                this.chat = response.data;
    	            }
    	          })
    	          .catch(error => {
    	            console.log(error);
    	          });
    	},
    	deleteSession(){
    	    axios.post('/deleteSession')
    	    .then(response=> this.$toaster.success('Chat history is deleted') );
    	}
    },




    mounted(){

    	 this.getOldMessages();

    	Echo.private('chat')
    	    .listen('ChatEvent', (e) => {
    	    	this.chat.message.push(e.message);
    	    	this.chat.user.push(e.user);
    	    	this.chat.color.push('warning');
    	    	this.chat.time.push(this.get_time());

    	    	axios.post('/saveToSession',{
    	    	    chat : this.chat
    	    	}).then(response => {
	    	      })
	    	      .catch(error => {
	    	        console.log(error);
	    	      });
    	        
    	  }).listenForWhisper('typing', (e) => {
    	        	if (e.name !='') {
    	        		this.typing='typing...'
    	        	}else{
    	        		this.typing=''
    	        	}
    	            
    	   });

    	  // sending notification

    	  Echo.join(`chat`)
    	      .here((users) => {
    	          
    	          this.numOfUser=users.length
    	      })
    	      .joining((user) => {
    	      	this.numOfUser +=1
    	        this.$toaster.success(user.name+' is joined in chat room.')
    	      })
    	      .leaving((user) => {
    	         this.numOfUser -=1
    	         this.$toaster.error(user.name+' is leaved from chat room.')
    	      });
    }
});
