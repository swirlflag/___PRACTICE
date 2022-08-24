gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

const scoped = (fn) => fn();
const sayTitle = (area, title) => {
    const p = document.createElement("h2");
    p.innerText = title;
    area.insertBefore(p, area.firstChild);
};

ScrollTrigger.defaults({
    start: "0% 70%",
    end: "100% 30%",
    markers: true,
})

const move = document.querySelector(".area-0 .move");

// basic
scoped(() => {
	const area = document.querySelector(".area-1");
    sayTitle(area, "basic");

	const move1 = area.querySelector(".move-1");
	const move2 = area.querySelector(".move-2");

	// gsap 속성 방식
	gsap.to(move1, {
		x: area.offsetWidth - move1.offsetWidth,
		ease: "none",
		duration: 1,
		scrollTrigger: {
			trigger: area,
			// endTrigger: area,

			scrub: 1,
		},
	});

	// ScrollTrigger.create 방식
	ScrollTrigger.create({
		animation: gsap.from(move2, {
			x: area.offsetWidth - move1.offsetWidth,
			ease: "none",
			duration: 1,
		}),
		trigger: area,

		scrub: 1,
	});
});

// multiple control
scoped(() => {
	const area = document.querySelector(".area-2");
    sayTitle(area, "multiple control");

	// timeline 방식
	const move1 = area.querySelector(".move-1");
	const move2 = area.querySelector(".move-2");
	const move3 = area.querySelector(".move-3");

    const tl = gsap.timeline();

    const tweenValues = {
        x: area.offsetWidth - move1.offsetWidth,
        ease: "power2.inOut",
        duration: 10,
    };

    tl.to(move1, { ...tweenValues }, 0);
    tl.to(move2, { ...tweenValues }, 2);
    tl.to(move3, { ...tweenValues }, 4);

    area_st = ScrollTrigger.create({
        animation: tl,
        trigger: area,
        scrub: 1,
    });

	// stagger 방식
	const moves = area.querySelectorAll(".move");

	ScrollTrigger.create({
		animation: gsap.to(moves, {
            rotate: 90,
            stagger: 2,
            duration: 10,
        }),
        trigger: area,
        scrub: 1,
	});

});

// resize,refresh shooting
scoped(() => {
    const area = document.querySelector(".area-3");
    sayTitle(area, "resize shooting");

    const move1 = area.querySelector(".move-1");
    let tl = gsap.timeline();
    let st = null;

    const settingTrigger = () => {
        if(tl) {
            tl.clear();
            tl.kill();
        }
        if(st) {
            st.kill(true,false);
        }

        tl.fromTo(move1, {
            x: 0,
        },{
            x: area.offsetWidth - move1.offsetWidth,
            ease: "power1.inOut"
        });

        st = ScrollTrigger.create({
            animation: tl,
            trigger: area,
            scrub: 1,
        });

    };

    settingTrigger();

    window.addEventListener("resize" , settingTrigger);

});

// timing methods
scoped(() => {
    const area = document.querySelector(".area-4");
    sayTitle(area, "timing methods");

    const move = area.querySelector(".move");
    const log = area.querySelector(".log");
    const logSlots = log.querySelectorAll("p > span");

    const alertAnimation = [
        {
            color: "#f00",
            scale: 1.5,
        } ,
        {
            color : "#000" ,
            scale: 1,
            ease: "power2.inOut",
            duration: 0.6,
        }
    ]

    ScrollTrigger.create({
        animation: gsap.to(move, {x: area.offsetWidth - move.offsetWidth}),
        trigger: area,
        scrub: 1,
        onUpdate(v) {
            logSlots[0].innerText = `progress : ${v.progress}`;
        },
        onEnter(v) {
            gsap.fromTo(logSlots[1] , ...alertAnimation);
        },
        onEnterBack(v) {
            gsap.fromTo(logSlots[2] , ...alertAnimation);
        },
        onLeave() {
            gsap.fromTo(logSlots[3] , ...alertAnimation);
        },
        onLeaveBack() {
            gsap.fromTo(logSlots[4] , ...alertAnimation);
        },
        onScrubComplete(progress) {
            gsap.fromTo(logSlots[5] , ...alertAnimation);
        },
        onSnapComplete() {
        },
        onToggle(v) {
            gsap.fromTo(logSlots[6] , ...alertAnimation);
        }
    });
});

// pin
scoped(() => {
    const area = document.querySelector(".area-5");
    sayTitle(area, "pin");
    const move = area.querySelectorAll(".move");
    gsap.set(area , {height: "100vh"})
    gsap.set(move, {position: "absolute", top: 0, left: 0});

    const tl = gsap.timeline();
    [...move].map((item,i) => {
        const ease = i%2 ? ["power1.out", "power1.in"] : ["power1.in", "power1.out"];
        const timing = i * 0.02 + (i%2 ? 0.01 : 0);

        tl.to(item, {
            x: area.offsetWidth - item.offsetWidth,
            ease : ease[0],
        }, timing);
        tl.to(item, {
            y: area.offsetHeight - item.offsetHeight,
            ease : ease[1],
        }, timing);
    });

    ScrollTrigger.create({
        animation: tl,
        trigger: area,
        start: "0% 0%",
        end: "100% 0%",
        pin: true,
        ease: "power2.out",
        scrub: 0.2,
        pinSpacing: true,
    });
});

// match media
scoped(() => {
    const area = document.querySelector(".area-6");
    sayTitle(area, "match media");
});

// flip + InertiaPlugin
scoped(() => {
    const area = document.querySelector(".area-0");
    sayTitle(area, "flip + InertiaPlugin");
    const move = area.querySelector(".move");

    const state = Flip.getState(move);

    // move.style.position = "fixed";
    // move.style.top = 0;
    // move.style.left = 0;

    move.style.left = '100px';



    const myFunc = () => {
        console.log('d');
    }


    ScrollTrigger.create({
        trigger: area,
        onEnter: () => {

        }
    })
    Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
        // absolute: true,
        fixed: true,
        onComplete: myFunc
    });
});

// quickTO

// Physics2D

// horizontal