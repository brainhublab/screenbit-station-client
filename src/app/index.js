;
const programs = require('./programs');

const run = () => {
    let index = 0;
    let currentHourData;
    let keys;
    let prevTimeout;
    const clearPrevTimeout = () => {
        if (prevTimeout) {
            clearTimeout(prevTimeout);
        }
    }

    const sourceInfo = document.getElementById('source-info');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const video = document.getElementById("video-element");
    const image = document.getElementById("img-element");
    // at the end of the video
    video.addEventListener("ended", () => rotate());
    // btn next
    nextButton.addEventListener('click', () => {
        clearPrevTimeout();
        rotate();
    });
    prevButton.addEventListener('click', () => {
        clearPrevTimeout();
        const currentIdx = index - 1;
        if (currentIdx > keys.length || currentIdx < 1) {
            index = keys.length - 1;
        } else {
            index = currentIdx - 1;
        }
        rotate();
    });

    const changeSoureInfo = (newText) => {
        sourceInfo.textContent = newText;
    }

    const reset = () => {
        index = 0;
        currentHourData = programs.get_program();
        keys = Object.keys(currentHourData);
    }

    reset();

    const setNewSource = (newUrl, isVideo) => {
        clearPrevTimeout();
        if (isVideo) {
            image.classList.remove("visible");
            video.classList.add("visible");
            video.setAttribute("src", newUrl);
            video.load();
            video.muted = true;
            video.play();
        } else {
            video.pause();
            video.classList.remove("visible");
            image.classList.add("visible");
            image.setAttribute("src", newUrl);
            image.setAttribute("data-index", index);
        }
    }

    function rotate() {
        if (index >= keys.length) {
            // end of the current hour data, reload
            reset();
        }

        const ad = currentHourData[keys[String(index)]];

        changeSoureInfo(`${index} / Duration: ${ad.duration}s / Type: ${ad.type} / Adv id: ${ad.ad_id}`);
        if (ad["type"] === "VD") {
            setNewSource(ad["url"], true);
        } else if (ad["type"] === "IM") {
            setNewSource(ad["url"], false);
            if (typeof ad["duration"] == "undefined") {
                ad["duration"] = 2;
            }
            prevTimeout = setTimeout(rotate, ad["duration"] * 1000);
        }
        index += 1;
    };

    rotate();
};

exports.run = run;