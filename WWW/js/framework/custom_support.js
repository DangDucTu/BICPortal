function initSupport(){
	$('.tongle').hide();
	$('a.hide').hide();
	$('.show-support').click(function () {
	    $(".slide-support").show();
	    $('.tongle').slideToggle('up');
	    $('a.hide').show();
	});
	
	/*$('.tongle').click(function(){
		$('.tongle').slideToggle('up');
		//$('a.title').hide();
		//$('a.hide').show();
	
		});*/
	$('a.hide').click(function(){
		$('.tongle').slideToggle('up');
		//$('a.title').show();
		$('a.hide').hide();				
		});
	}
function initFormLogin(){
	$('.frm-login').hide();
	$('.top-navi a.login').click(function(){
		$('.frm-login').slideToggle();
		$('#background').show();
		});
	$('a.hide-frm').click(function(){
		$('.frm-login').slideToggle();
		});
	}
function checkForm(){
	var email = document.frmLogin.email;
	var password = document.frmLogin.password;
	if(email.value==''){
		if(password.value!=''){
		$('#errorPass').fadeOut();
		}
		$('#errorEmail').text('Email không được để trống');
		email.focus();
		return false;
		}
	if(password.value==''){
		if(email.value!=''){
		$('#errorEmail').fadeOut();
		}
		$('#errorPass').text('Mật khẩu không được để trống');
		password.focus();
		return false;
		}
	return true;
	}
	function initFormLogin2(){
		$('.popup-login').hide();
	$('.top-navi a.login').click(function(){
		$('.popup-login').fadeIn();
		});
	$('a.hide-frm').click(function(){
		$('.frm-login').slideToggle();
		});
		}
$(document).ready(function(){
	initSupport();
	initFormLogin();
	});