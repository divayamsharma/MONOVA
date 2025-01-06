// LOCOMOTIVE SCROLL 👇🏻
function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

/*_______________PAGE-2_______________*/
// Converts letter of page 2 into arrays for scroll text animation effect 👇🏻
function textClutterPage2() {
  var clutter = "";

  document
    .querySelector("#page2>h1")
    .textContent.split("")
    .forEach(function (dets) {
      clutter += `<span>${dets}</span>`;
    });
  document.querySelector("#page2>h1").innerHTML = clutter;
}
textClutterPage2();

// Scroll text opacity animation effect for page2
function mrScrollTextPage2() {
  gsap.fromTo(
    "#page2>h1>span",
    {
      color: "#3f62d8",
      opacity: 0.9,
    }, // Starting color (lightsh blue)
    {
      color: "#fff", // Ending color (white)
      opacity: 1,
      scrollTrigger: {
        trigger: "#page2>h1",
        start: "top bottom",
        end: "bottom+=70% bottom",
        scroller: "#main",
        scrub: 1,
      },
      stagger: {
        amount: 5, // Adjust the stagger effect to create delay between words
        from: "start", // Animate from the first word
      },
    },
  );
}
mrScrollTextPage2();

/*_______________PAGE-3_______________*/
//👇🏻👇🏻👇🏻👇🏻👇🏻 YOU NEED TO UNDERSTAND THIS ⚠️⚠️⚠️⚠️⚠️⚠️⚠️
function mrCanvas() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./Resources/frames00007.png
  ./Resources/frames00010.png
  ./Resources/frames00013.png
  ./Resources/frames00016.png     
  ./Resources/frames00019.png
  ./Resources/frames00022.png
  ./Resources/frames00025.png
  ./Resources/frames00028.png
  ./Resources/frames00031.png
  ./Resources/frames00034.png
  ./Resources/frames00037.png
  ./Resources/frames00040.png
  ./Resources/frames00043.png
  ./Resources/frames00046.png
  ./Resources/frames00049.png
  ./Resources/frames00052.png
  ./Resources/frames00055.png
  ./Resources/frames00058.png
  ./Resources/frames00061.png
  ./Resources/frames00064.png
  ./Resources/frames00067.png
  ./Resources/frames00070.png
  ./Resources/frames00073.png
  ./Resources/frames00076.png
  ./Resources/frames00079.png
  ./Resources/frames00082.png
  ./Resources/frames00085.png
  ./Resources/frames00088.png
  ./Resources/frames00091.png
  ./Resources/frames00094.png
  ./Resources/frames00097.png
  ./Resources/frames00100.png
  ./Resources/frames00103.png
  ./Resources/frames00106.png
  ./Resources/frames00109.png
  ./Resources/frames00112.png
  ./Resources/frames00115.png
  ./Resources/frames00118.png
  ./Resources/frames00121.png
  ./Resources/frames00124.png
  ./Resources/frames00127.png
  ./Resources/frames00130.png
  ./Resources/frames00133.png
  ./Resources/frames00136.png
  ./Resources/frames00139.png
  ./Resources/frames00142.png
  ./Resources/frames00145.png
  ./Resources/frames00148.png
  ./Resources/frames00151.png
  ./Resources/frames00154.png
  ./Resources/frames00157.png
  ./Resources/frames00160.png
  ./Resources/frames00163.png
  ./Resources/frames00166.png
  ./Resources/frames00169.png
  ./Resources/frames00172.png
  ./Resources/frames00175.png
  ./Resources/frames00178.png
  ./Resources/frames00181.png
  ./Resources/frames00184.png
  ./Resources/frames00187.png
  ./Resources/frames00190.png
  ./Resources/frames00193.png
  ./Resources/frames00196.png
  ./Resources/frames00199.png
  ./Resources/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio,
    );
  }
  ScrollTrigger.create({
    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
mrCanvas();

/*_______________PAGE-4_______________*/
// Converts letter of page 4 into arrays for scroll text animation effect 👇🏻 same as above(page-2)
function textClutterPage4() {
  var clutter = "";

  document
    .querySelector("#page4>h1")
    .textContent.split("")
    .forEach(function (dets) {
      clutter += `<span>${dets}</span>`;
    });
  document.querySelector("#page4>h1").innerHTML = clutter;
}
textClutterPage4();

// Scroll text opacity animation effect for page-4 same as above(page-2)
function mrScrollTextPage4() {
  gsap.fromTo(
    "#page4>h1>span",
    {
      color: "#3f62d8",
      opacity: 0.9,
    }, // Starting color (lightsh blue)
    {
      color: "#fff", // Ending color (white)
      opacity: 1,
      scrollTrigger: {
        trigger: "#page4>h1",
        start: "top bottom",
        end: "bottom+=70% bottom",
        scroller: "#main",
        scrub: 1,
      },
      stagger: {
        amount: 5, // Adjust the stagger effect to create delay between words
        from: "start", // Animate from the first word
      },
    },
  );
}
mrScrollTextPage4();

/*_______________PAGE-5_______________*/
function mrCanvasPage5() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./Resources/bridges00004.png
./Resources/bridges00007.png
./Resources/bridges00010.png
./Resources/bridges00013.png
./Resources/bridges00016.png
./Resources/bridges00019.png
./Resources/bridges00022.png
./Resources/bridges00025.png
./Resources/bridges00028.png
./Resources/bridges00031.png
./Resources/bridges00034.png
./Resources/bridges00037.png
./Resources/bridges00040.png
./Resources/bridges00043.png
./Resources/bridges00046.png
./Resources/bridges00049.png
./Resources/bridges00052.png
./Resources/bridges00055.png
./Resources/bridges00058.png
./Resources/bridges00061.png
./Resources/bridges00064.png
./Resources/bridges00067.png
./Resources/bridges00070.png
./Resources/bridges00073.png
./Resources/bridges00076.png
./Resources/bridges00079.png
./Resources/bridges00082.png
./Resources/bridges00085.png
./Resources/bridges00088.png
./Resources/bridges00091.png
./Resources/bridges00094.png
./Resources/bridges00097.png
./Resources/bridges00100.png
./Resources/bridges00103.png
./Resources/bridges00106.png
./Resources/bridges00109.png
./Resources/bridges00112.png
./Resources/bridges00115.png
./Resources/bridges00118.png
./Resources/bridges00121.png
./Resources/bridges00124.png
./Resources/bridges00127.png
./Resources/bridges00130.png
./Resources/bridges00133.png
./Resources/bridges00136.png
./Resources/bridges00139.png
./Resources/bridges00142.png
./Resources/bridges00145.png
./Resources/bridges00148.png
./Resources/bridges00151.png
./Resources/bridges00154.png
./Resources/bridges00157.png
./Resources/bridges00160.png
./Resources/bridges00163.png
./Resources/bridges00166.png
./Resources/bridges00169.png
./Resources/bridges00172.png
./Resources/bridges00175.png
./Resources/bridges00178.png
./Resources/bridges00181.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#page5`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio,
    );
  }
  ScrollTrigger.create({
    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
mrCanvasPage5();

/*_______________PAGE-6_______________*/
// Converts letter of page 4 into arrays for scroll text animation effect 👇🏻 same as above(page-2)
function textClutterPage6() {
  var clutter = "";

  document
    .querySelector("#page6>h1")
    .textContent.split("")
    .forEach(function (dets) {
      clutter += `<span>${dets}</span>`;
    });
  document.querySelector("#page6>h1").innerHTML = clutter;
}
textClutterPage6();

// Scroll text opacity animation effect for page-4 same as above(page-2)
function mrScrollTextPage6() {
  gsap.fromTo(
    "#page6>h1>span",
    {
      color: "#3f62d8",
      opacity: 0.9,
    }, // Starting color (lightsh blue)
    {
      color: "#fff", // Ending color (white)
      opacity: 1,
      scrollTrigger: {
        trigger: "#page6>h1",
        start: "top bottom",
        end: "bottom+=70% bottom",
        scroller: "#main",
        scrub: 1,
      },
      stagger: {
        amount: 5, // Adjust the stagger effect to create delay between words
        from: "start", // Animate from the first word
      },
    },
  );
}

mrScrollTextPage6();

/*_______________PAGE-7_______________*/
function mrCanvasPage7() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `

https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio,
    );
  }
  ScrollTrigger.create({
    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
mrCanvasPage7();

gsap.fromTo(
  ".page7-circle",
  { scale: 0, opacity: 0 }, // Starting scale and opacity
  {
    scale: 1.5,
    opacity: 1,
    scrollTrigger: {
      trigger: `.page7-circle`,
      // start: `top center`,
      // end: `bottom top`,
      start: `top 90%`,
      end: `bottom 10%`,
      scroller: `#main`,
      scrub: 5,
    },
  },
);

gsap.fromTo(
  ".page7-circle-inner",
  { scale: 0, opacity: 0 }, // Starting scale and opacity
  {
    scale: 1,
    opacity: 1,
    backgroundColor: `#0a3bce91`,
    scrollTrigger: {
      trigger: `.page7-circle-inner`,
      // start: `top center`,
      // end: `bottom top`,
      start: `top 90%`,
      end: `bottom 10%`,
      scroller: `#main`,
      scrub: 5,
    },
  },
);

// ROTATER ________________ TEST
// function mrCanvasPage11(){
//     const canvas = document.querySelector("#page11-items>canvas");
//     const context = canvas.getContext("2d");
//
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//
//
//     window.addEventListener("resize", function () {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         render();
//     });
//
//     function files(index) {
//         var data = `
//   ./Resources/frame0001.jpg
//   ./Resources/frame0002.jpg
//   ./Resources/frame0003.jpg
//   ./Resources/frame0004.jpg
//   ./Resources/frame0005.jpg
//   ./Resources/frame0006.jpg
//   ./Resources/frame0007.jpg
//   ./Resources/frame0008.jpg
//   ./Resources/frame0009.jpg
//   ./Resources/frame0010.jpg
//   ./Resources/frame0011.jpg
//   ./Resources/frame0012.jpg
//   ./Resources/frame0013.jpg
//   ./Resources/frame0014.jpg
//
//  `;
//         return data.split("\n")[index];
//     }
//
//     const frameCount = 22;
//
//     const images = [];
//     const imageSeq = {
//         frame: 1,
//     };
//
//     for (let i = 0; i < frameCount; i++) {
//         const img = new Image();
//         img.src = files(i);
//         images.push(img);
//     }
//
//     gsap.to(imageSeq, {
//         frame: frameCount - 1,
//         snap: "frame",
//         ease: `none`,
//         scrollTrigger: {
//             scrub: .5,
//             trigger: `#page11`,
//             start: `top top`,
//             end: `250% top`,
//             scroller: `#main`,
//         },
//         onUpdate: render,
//     });
//
//     images[1].onload = render;
//
//     function render() {
//         scaleImage(images[imageSeq.frame], context);
//     }
//
//     function scaleImage(img, ctx) {
//         var canvas = ctx.canvas;
//         var hRatio = canvas.width / img.width;
//         var vRatio = canvas.height / img.height;
//         var ratio = Math.max(hRatio, vRatio);
//         var centerShift_x = (canvas.width - img.width * ratio) / 2;
//         var centerShift_y = (canvas.height - img.height * ratio) / 2;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(
//             img,
//             0,
//             0,
//             img.width,
//             img.height,
//             centerShift_x,
//             centerShift_y,
//             img.width * ratio,
//             img.height * ratio
//         );
//     }
//     ScrollTrigger.create({
//
//         trigger: "#page11",
//         pin: true,
//         scroller: `#main`,
//         start: `top top`,
//         end: `250% top`,
//     });
// }
// mrCanvasPage11();
