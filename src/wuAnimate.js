import { wuGeneral } from "./wuGeneral";
export class wuAnimate {
    static shake(elem, duration = 200) {
        elem.animate([
            { transform: 'translateX(0)', rotate: '0deg' },
            { transform: 'translateX(-5px)', rotate: '-2deg' },
            { transform: 'translateX(5px)', rotate: '0deg' },
            { transform: 'translateX(-5px)', rotate: '2deg' },
            { transform: 'translateX(5px)', rotate: '0deg' },
            { transform: 'translateX(-5px)', rotate: '-2deg' },
            { transform: 'translateX(0)', rotate: '0deg' },
        ], {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    static pop(elem, duration = 200, scale = 1.05) {
        elem.animate([
            { transform: 'scale(1)' },
            { transform: `scale(${scale})` },
            { transform: 'scale(1)' },
        ], {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    static bounce(elem, duration = 200) {
        elem.animate([], {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    static spin(elem, duration = 400) {
        elem.animate([
            { rotate: '0deg' },
            { rotate: '720deg' },
        ], {
            duration: duration,
            easing: 'ease-in-out',
        });
    }
    static remove(elem, duration = 200) {
        elem.style.overflow = "hidden";
        elem.animate([
            { opacity: 1, height: wuGeneral.smartHeight(elem) + "px" },
            { opacity: 0, height: "0px" },
        ], {
            duration: duration,
            easing: 'ease-in-out',
        });
        setTimeout(() => {
            elem.remove();
        }, duration);
    }
    static show(elem, display = "block", duration = 200) {
        if (elem.dataset.visibility == "visible")
            return;
        elem.dataset.visibility = "showing";
        elem.style.opacity = "0";
        elem.style.display = display;
        setTimeout(() => {
            elem.animate([
                { opacity: 0, transform: "translateY(5px)" },
                { opacity: 1, transform: "translateY(0)" },
            ], {
                duration: duration,
                easing: 'ease-in-out',
                fill: "forwards",
            });
        });
        setTimeout(() => {
            elem.style.opacity = "1";
            elem.style.display = display;
            elem.dataset.visibility = "visible";
            console.log("actually showing");
        }, duration);
    }
    static hide(elem, duration = 200) {
        if (elem.dataset.visibility == "hidden")
            return;
        elem.dataset.visibility = "hiding";
        elem.animate([
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(5px)" },
        ], {
            duration: duration,
            easing: 'ease-in-out',
            fill: "forwards",
        });
        setTimeout(() => {
            if (elem.dataset.visibility == "hiding") {
                elem.style.display = "none";
                elem.dataset.visibility = "hidden";
            }
        }, duration);
    }
    static spinAnimation(element) {
        if (element.classList.contains('spinning'))
            return;
        element.classList.add('spinning');
        let rotation = 0;
        let interval = setInterval(() => {
            element.animate([
                { transform: `rotate(${rotation}deg)` },
                { transform: `rotate(${rotation += 45}deg)` }
            ], {
                duration: 50,
                fill: 'forwards',
                easing: 'ease-in-out'
            });
            if (!document.body.contains(element)) {
                clearInterval(interval);
                element.classList.remove('spinning');
            }
        }, 500);
    }
}
//# sourceMappingURL=wuAnimate.js.map