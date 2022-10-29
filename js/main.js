$(function () {
	// header
	// 스크롤 부분
	let lastScrollTop = 0;
	let delta = 15;
	$(window).scroll(function (event) {
		let st = $(this).scrollTop();

		if (Math.abs(lastScrollTop - st) <= delta) return;
		if (st > lastScrollTop && lastScrollTop > 0) {
			$('header').css('top', '-200px');
			$('header').addClass('up_scroll');
		} else if (st === 0) {
			$('header').removeClass('up_scroll');
		} else {
			$('header').css('top', '0px');
		}
		lastScrollTop = st;
	});

	// 마우스 호버
	$('.gnb > li').hover(
		function () {
			$('header').addClass('mouse_hover');
			$('.sub').stop().slideDown();
			$(this).find('.sub').addClass('on');
		},
		function () {
			$('header').removeClass('mouse_hover');
			$('.sub').removeClass('on');
			$('header .gnb .sub').stop().slideUp();
		}
	);

	// 언어선택 팝업 열기
	$('.btn_lang').click(function (e) {
		e.preventDefault();
		$('.lang_open').toggleClass('on');
	});

	// 돋보기 팝업 열기
	$('.btn_srh').click(function (e) {
		e.preventDefault();
		$('.total_srh_menu').addClass('on');
		$('.srh_content').addClass('active');
	});

	// 돋보기 팝업 닫기
	$('.close_btn').click(function (e) {
		e.preventDefault();
		$('.total_srh_menu').removeClass('on');
		$('.srh_content').removeClass('active');
	});

	// 통합메뉴 열기
	$('.btn_menu').click(function (e) {
		e.preventDefault();
		$('.all_menu').addClass('on');
	});

	// 통합메뉴 닫기
	$('.btn_close').click(function (e) {
		e.preventDefault();
		$('.all_menu').removeClass('on');
	});

	// 통합메뉴 서브 열기
	$('.one_depth').click(function (e) {
		e.preventDefault();
		$(this).siblings('.two_pack_wrap').slideToggle();
	});
	// //header

	// visual
	let _mainVisSwiper;
	let _progressBarMotion;
	let _originMotion;

	(_originMotion = gsap.to(
		$('.sc_visual .swiper-slide:first-child .txt_area'),
		5,
		{
			opacity: 1,
			ease: Power4.easeOut,
			onComplete: function () {
				$('.sc_visual').removeClass('first');
			},
		}
	)),
		// vision
		$('.basic_motion').each(function (q) {
			gsap.to($(this), {
				scrollTrigger: {
					trigger: $(this),
					start: 'top 75%',
					end: '+=180%',
					scrub: 1,
					//markers: true,
					toggleClass: { targets: $(this), className: 'active' },
				},
			});
		});

	if ($('.scrollMotion').length > 0) {
		$('.scrollMotion:visible').each(function (q) {
			gsap.to($(this), {
				scrollTrigger: {
					trigger: $(this),
					start: 'top 75%',
					end: 'bottom center',
					toggleClass: {
						targets: $('.scrollMotion:visible').eq(q),
						className: 'active',
					},
					once: true,
					//markers: true,
				},
			});
		});
	}

	_progressBarMotion = gsap.to($('.sc_visual .progress_bar .bar'), 5, {
		width: '100%',
		ease: 'none',
		onComplete: function () {
			_mainVisSwiper.slideNext();
		},
	});

	_mainVisSwiper = new Swiper('.sc_visual .swiper-container', {
		loop: true,
		speed: 2500,
		observer: true,
		observeParents: true,
		allowTouchMove: false,
		effect: 'fade',
		pagination: {
			el: '.sc_visual .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.sc_visual .swiper-btn-next',
			prevEl: '.sc_visual .swiper-btn-prev',
		},
		on: {
			init: function () {},
		},
	});
	_mainVisSwiper.on('slideChange', function () {
		if ($('.pause').hasClass('on')) {
			_progressBarMotion.restart();
		} else {
			_progressBarMotion.pause();
		}
	});

	$('.vis_control').on('click', function () {
		if ($('.pause').hasClass('on')) {
			$('.play').addClass('on');
			$('.pause').removeClass('on');
			_progressBarMotion.pause();
		} else {
			$('.pause').addClass('on');
			$('.play').removeClass('on');
			_progressBarMotion.resume();
		}
	});

	$('.arrow_wrap > span').on('click', function () {
		if ($('.vis_control').hasClass('pause')) {
			$('.sc_visual .vis_control_area .pagination .list canvas').css(
				'display',
				'none'
			);
			$('.sc_visual .vis_control_area .pagination .list.now_pause:after').css(
				'display',
				'block'
			);
		}
	});

	// wedo
	gsap.to('.video_wrap .fixed_video', {
		scrollTrigger: {
			trigger: '.video_wrap .fixed_video',
			start: 'top top',
			endTrigger: '.sc_wedo .mobiliy_wrap',
			end: 'bottom bottom',
			pin: true,
			// markers: true
		},
	});

	const date = document.querySelectorAll('em');
	date.forEach((d) => {
		d.innerText = new Date().toLocaleDateString();
	});

	// footer
	const footer = document.querySelector('footer');
	const photoNum = 3;

	function callRan() {
		ranNum = Math.floor(Math.random() * 3 + 1);
		return ranNum;
	}

	function callPho() {
		let ranNum = callRan();
		let url = `./images/banner/footer${ranNum}.jpeg`;
		footer.style.background = `url(${url}) center/cover no-repeat fixed`;
	}
	function init() {
		callPho();
	}
	init();
});
