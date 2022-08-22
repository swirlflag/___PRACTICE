gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const scoped = (fn) => fn();
const sayTitle = (area, title) => {
    const p = document.createElement("h2");
    p.innerText = title;
    area.insertBefore(p, area.firstChild);
};

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
			start: "0% 90%",
			end: "100% 0%",
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
		start: "0 90%",
		end: "100% 0%",
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
        start: "0% 80%",
        end: "100% 0%",
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
        start: "0% 80%",
        end: "100% 0%",
        makers: true,
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
            start: "0% 80%",
            end: "100% 0%",
            scrub: 1,
            makers: true,
        });

    };

    settingTrigger();

    window.addEventListener("resize" , settingTrigger);

});

// timing methods
scoped(() => {
    const area = document.querySelector(".area-4");
    sayTitle(area, "timing methods");
	// onUpdate: self => console.log("progress", self.progress)
	// onProgress:
	// onEnter:
	// onEnterBack
	// onLeave
	// onLeaveBack
	// onScrubComplete
	// onSnapComplete
	// onToggle
});

// pin
scoped(() => {
    const area = document.querySelector(".area-5");
    sayTitle(area, "pin");
});

// match media
scoped(() => {
    const area = document.querySelector(".area-6");
    sayTitle(area, "match media");
});


