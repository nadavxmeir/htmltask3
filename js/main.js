/* ===================================================================
 * Abstract 2.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  ("use strict");

  const cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL:
      "https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc", // MailChimp URL
  };

  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    document.querySelector("html").classList.add("ss-preload");

    window.addEventListener("load", function () {
      document.querySelector("html").classList.remove("ss-preload");
      document.querySelector("html").classList.add("ss-loaded");

      preloader.addEventListener("transitionend", function (e) {
        if (e.target.matches("#preloader")) {
          this.style.display = "none";
        }
      });
    });

    // force page scroll position to top at page refresh
    // window.addEventListener('beforeunload' , function () {
    //     window.scrollTo(0, 0);
    // });
  }; // end ssPreloader

  /* alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");
    if (!boxes) return;

    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (e.target.matches(".alert-box__close")) {
          e.stopPropagation();
          e.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 500);
        }
      });
    });
  }; // end ssAlertBoxes

  /* Mobile Menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const $navWrap = $(".s-header__nav-wrap");
    const $closeNavWrap = $navWrap.find(".s-header__overlay-close");
    const $menuToggle = $(".s-header__toggle-menu");
    const $siteBody = $("body");

    $menuToggle.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      $siteBody.addClass("nav-wrap-is-visible");
    });

    $closeNavWrap.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if ($siteBody.hasClass("nav-wrap-is-visible")) {
        $siteBody.removeClass("nav-wrap-is-visible");
      }
    });

    // open (or close) submenu items in mobile view menu.
    // close all the other open submenu items.
    $(".s-header__nav .has-children")
      .children("a")
      .on("click", function (e) {
        e.preventDefault();

        if ($(".close-mobile-menu").is(":visible") == true) {
          $(this)
            .toggleClass("sub-menu-is-open")
            .next("ul")
            .slideToggle(200)
            .end()
            .parent(".has-children")
            .siblings(".has-children")
            .children("a")
            .removeClass("sub-menu-is-open")
            .next("ul")
            .slideUp(200);
        }
      });
  }; // end ssMobileMenu

  /* search
   * ------------------------------------------------------ */
  const ssSearch = function () {
    const searchWrap = document.querySelector(".s-header__search");
    const searchTrigger = document.querySelector(".s-header__search-trigger");

    if (!(searchWrap && searchTrigger)) return;

    const searchField = searchWrap.querySelector(".s-header__search-field");
    const closeSearch = searchWrap.querySelector(".s-header__overlay-close");
    const siteBody = document.querySelector("body");

    searchTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      siteBody.classList.add("search-is-visible");
      setTimeout(function () {
        searchWrap.querySelector(".s-header__search-field").focus();
      }, 100);
    });

    closeSearch.addEventListener("click", function (e) {
      e.stopPropagation();

      if (siteBody.classList.contains("search-is-visible")) {
        siteBody.classList.remove("search-is-visible");
        setTimeout(function () {
          searchWrap.querySelector(".s-header__search-field").blur();
        }, 100);
      }
    });

    searchWrap.addEventListener("click", function (e) {
      if (!e.target.matches(".s-header__search-field")) {
        closeSearch.dispatchEvent(new Event("click"));
      }
    });

    searchField.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    searchField.setAttribute("placeholder", "Type Keywords");
    searchField.setAttribute("autocomplete", "off");
  }; // end ssSearch
  document.addEventListener("DOMContentLoaded", function () {
    fetch("/navbar.html")
      .then((r) => r.text())
      .then((html) => {
        document.getElementById("navbar").innerHTML = html;
        ssMobileMenu(); // Initialize mobile menu after navbar exists
        ssSearch();
      });
  });

  /* masonry
   * ------------------------------------------------------ */
  const ssMasonry = function () {
    const containerBricks = document.querySelector(".bricks-wrapper");
    if (!containerBricks) return;

    imagesLoaded(containerBricks, function () {
      const msnry = new Masonry(containerBricks, {
        itemSelector: ".entry",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        resize: true,
      });
    });
  }; // end ssMasonry

  /* animate bricks
   * ------------------------------------------------------ */
  const ssBricksAnimate = function () {
    const animateEl = document.querySelectorAll(".animate-this");
    if (!animateEl) return;

    window.addEventListener("load", function () {
      setTimeout(function () {
        animateEl.forEach(function (item, ctr) {
          let el = item;

          setTimeout(function () {
            el.classList.add("animated", "fadeInUp");
          }, ctr * 200);
        });
      }, 200);
    });

    window.addEventListener("resize", function () {
      // remove animation classes
      animateEl.forEach(function (item) {
        let el = item;
        el.classList.remove("animate-this", "animated", "fadeInUp");
      });
    });
  }; // end ssBricksAnimate

  /* slick slider
   * ------------------------------------------------------ */
  const ssSlickSlider = function () {
    function ssRunFeaturedSlider() {
      const $fSlider = $(".featured-post-slider").slick({
        arrows: false,
        dots: false,
        speed: 1000,
        fade: true,
        cssEase: "linear",
        slidesToShow: 1,
        centerMode: true,
      });

      $(".featured-post-nav__prev").on("click", function () {
        $fSlider.slick("slickPrev");
      });

      $(".featured-post-nav__next").on("click", function () {
        $fSlider.slick("slickNext");
      });
    } // end ssRunFeaturedSlider

    function ssRunGallerySlider() {
      const $gallery = $(".slider__slides").slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        pauseOnFocus: false,
        fade: true,
        cssEase: "linear",
      });

      $(".slider__slide").on("click", function () {
        $gallery.slick(
          "slickGoTo",
          parseInt($gallery.slick("slickCurrentSlide")) + 1
        );
      });
    } // end ssRunGallerySlider

    ssRunFeaturedSlider();
    ssRunGallerySlider();
  }; // end ssSlickSlider

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  const ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      let target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          window.location.hash = target;
        });
    });
  }; // endSmoothScroll

  /* AjaxChimp
   * ------------------------------------------------------ */
  const ssAjaxChimp = function () {
    $("#mc-form").ajaxChimp({
      language: "es",
      url: cfg.mailChimpURL,
    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
      submit: "Submitting...",
      0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    };
  }; // end ssAjaxChimp

  /* back to top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 800;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    // Show or hide the button
    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        if (!goTopButton.classList.contains("link-is-visible"))
          goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  }; // end ssBackToTop

  /* Expand / collapse behaviour for masonry entries
   * ------------------------------------------------------ */
  document.querySelectorAll(".brick.entry").forEach((entry) => {
    const cardText = entry.querySelector(".entry__text");
    if (!cardText) return;
    const excerpt = cardText.querySelector(".entry__excerpt p");
    const btn = cardText.querySelector(".expand-btn");

    // Helper: Apply line clamp (CSS ellipsis)
    const applyClamp = (lines = 5) => {
      excerpt.style.display = "-webkit-box";
      excerpt.style.webkitBoxOrient = "vertical";
      excerpt.style.webkitLineClamp = String(lines);
      excerpt.style.overflow = "hidden";
    };

    // Helper: Remove line clamp (show full text)
    const removeClamp = () => {
      excerpt.style.display = "block";
      excerpt.style.webkitLineClamp = "unset";
      excerpt.style.overflow = "visible";
    };

    // Initial setup: Clamp text to 5 lines
    applyClamp(5);

    // Check if "Read more" button is actually needed
    // (We compare scrollHeight vs clientHeight to see if text is overflowing)
    const needsButton = () => {
      return excerpt.scrollHeight > excerpt.clientHeight;
    };

    if (needsButton()) {
      btn.style.display = "block";
      btn.textContent = "Read more…";
    } else {
      btn.style.display = "none";
    }

    // --- CLICK HANDLER ---
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const msnry = window._msnry; // Get the masonry instance
      const isExpanded = entry.classList.contains("expanded");

      // 1. Freeze the current height (in pixels) to prepare for animation
      // This prevents the card from jumping instantly.
      entry.style.height = entry.offsetHeight + "px";

      // 2. Use requestAnimationFrame to ensure the browser registers the frozen height
      requestAnimationFrame(() => {
        if (!isExpanded) {
          // --- EXPANDING ---
          entry.classList.add("expanded");
          removeClamp(); // Show all text
          btn.textContent = "Show less";
        } else {
          // --- COLLAPSING ---
          entry.classList.remove("expanded");
          applyClamp(5); // Hide text again
          btn.textContent = "Read more…";
        }

        // 3. Calculate the new height the card WANTS to be
        // (We read scrollHeight now that the clamp is changed)
        const targetHeight = entry.scrollHeight;

        // 4. Set the new height explicitly to trigger CSS transition
        entry.style.height = targetHeight + "px";

        // 5. CRITICAL: Update Masonry immediately
        // This tells the grid: "I am changing size, move the other cards NOW."
        if (msnry) {
          msnry.layout();
        }
      });

      // 6. Cleanup: After animation ends, set height to 'auto'
      // This ensures the card stays responsive if the window is resized.
      const onTransitionEnd = (e) => {
        // Ensure we only react to the height transition of the card itself
        if (e.target === entry && e.propertyName === "height") {
          entry.style.height = ""; // Reset to auto
          entry.removeEventListener("transitionend", onTransitionEnd);
        }
      };

      entry.addEventListener("transitionend", onTransitionEnd);
    });
  });
  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssAlertBoxes();
    ssSearch();
    ssMobileMenu();
    ssMasonry();
    ssBricksAnimate();
    ssSlickSlider();
    ssSmoothScroll();
    ssAjaxChimp();
    ssBackToTop();
  })();
})(jQuery);
