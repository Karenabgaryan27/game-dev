import React from "react";

const glareStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    borderRadius: "inherit",
};

const glareInnerStyle = (width) => {
    return {
        position: "absolute",
        top: "50%",
        left: "50%",
        pointerEvents: "none",
        backgroundImage: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
        transform: "rotate(180deg) translate(-50%, -50%)",
        transformOrigin: "0% 0%",
        opacity: "0",
        width: width * 2 + "px", // "814px",
        height: width * 2 + "px" // "814px",
    };
};

let glareElement = null;
let glareInnerElement = null;
let angle = 0;
let images = null;
let element = null;
let halfHeight = 0;
let halfWidth = 0;
let width = null;
let height = null;

export default function useParallaxEffect({
    axisDepth = 10,
    reverse = false,
    glare = false,
    maxGlare = 1,
    imageReverse = false,
    speed = 100,
    imageSpeed = 600,
    imageRange = 1,
}) {
    const reset = () => {
        glareElement?.remove();
        glareElement = null;
        glareInnerElement = null;
        angle = 0;
        images = null;
        element = null;
        halfHeight = 0;
        halfWidth = 0;
        width = 0;
        height = 0;
    };

    const setProperties = (e) => {
        element = e.currentTarget.querySelector("[data-parallax-inner]") || e.currentTarget;
        images = e.currentTarget.querySelectorAll("[data-parallax-image]");
        halfHeight = element.offsetHeight / 2;
        halfWidth = element.offsetWidth / 2;
        width = element.offsetWidth;
        height = element.offsetHeight;
    };

    const createGlare = () => {
        glareElement = document.createElement("div");
        glareElement.className = "glare";
        Object.assign(glareElement.style, glareStyle);

        glareInnerElement = document.createElement("div");
        Object.assign(glareInnerElement.style, glareInnerStyle(element.offsetWidth));
        glareInnerElement.className = "glare-inner";

        element.appendChild(glareElement);
        glareElement.appendChild(glareInnerElement);
    };

    const start = (e) => {
        setProperties(e);
        if (glare) createGlare();
        element.style.transition = `transform ${speed}ms ease-out`;
        if (images) {
            images.forEach((image) => {
                const speed = image.dataset.parallaxSpeed || imageSpeed;
                image.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
            });
        }
    };
    const end = () => {
        element.style.transform = "";
        element.style.transition = "transform .6s ease";
        if (images) {
            images.forEach((image) => {
                image.style.transition = "transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
                image.style.transform = "";
            });
        }
        reset();
    };
    const move = (e) => {
        const top = e.currentTarget.getBoundingClientRect().top;
        const left = e.currentTarget.getBoundingClientRect().left;
        const y = e.clientY - top;
        const x = e.clientX - left;
        const posX = (x - halfWidth) / axisDepth;
        const posY = (y - halfHeight) / axisDepth;
        const style = reverse
            ? `perspective(600px) rotateX(${-posY}deg)  rotateY(${posX}deg)`
            : `perspective(600px) rotateX(${posY}deg)  rotateY(${-posX}deg)`;
        element.style.transform = style;
        // requestAnimationFrame(() => (cardItem.current.style.transform = `rotateX(${posY}deg)  rotateY(${posX}deg)`));

        if (images && imageReverse)
            images.forEach((image) => {
                const range = image.dataset.parallaxRange || imageRange;
                image.style.transform = `translateX(${posX * range}px) translateY(${posY * range}px)`;
            });
        if (images && !imageReverse)
            images.forEach((image) => {
                const range = image.dataset.parallaxRange || imageRange;
                image.style.transform = `translateX(${-posX * range}px) translateY(${-posY * range}px)`;
            });

        if (!glareElement) return;
        angle = Math.atan2(e.clientX - (left + width / 2), -(e.clientY - (top + height / 2))) * (180 / Math.PI);
        glareInnerElement.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`;
        glareInnerElement.style.opacity = `${Math.min(Math.max((e.clientY - top) / height, 0), 1) * maxGlare}`;
    };

    return { start, end, move };
}
