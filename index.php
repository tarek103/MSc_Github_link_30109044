<!DOCTYPE html>
<html>

<head>
  <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Site Metas -->
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />

  <title>FoodFinder</title>
  <!-- slider stylesheet -->
  <link rel="stylesheet" type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />

  <!-- bootstrap core css -->
  <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />

  <!-- fonts style -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Poppins:400,700|Raleway:400,700&display=swap"
    rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="css/style.css" rel="stylesheet" />
  <!-- responsive style -->
  <link href="css/responsive.css" rel="stylesheet" />
</head>

<body>
  <div class="hero_area">
    <!-- header section strats -->
    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
          <a class="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="" />
            <span>
              FoodFinder
            </span>
          </a>

          <div class="navbar-collapse" id="">
            <div class="custom_menu-btn">
              <button onclick="openNav()">
                <span class="s-1"> </span>
                <span class="s-2"> </span>
                <span class="s-3"> </span>
              </button>
            </div>
            <div id="myNav" class="overlay">
              <div class="overlay-content">
                <a href="#">HOME</a>
                
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <!-- end header section -->
    <!-- slider section -->
    <section class=" slider_section position-relative">
      <div class="side_heading">
        <h5>
          Food Finder
        </h5>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-4 offset-md-1">
            <div id="carouselExampleIndicators" class="carousel slide " data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active">
                  01
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1">
                  02
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2">
                  03
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3">
                  04
                </li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="img-box b-1">
                    <img src="images/slider-img.png" alt="" />
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="img-box b-2">
                    <img src="images/hot-1.png" alt="" />
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="img-box b-3">
                    <img src="images/hot-2.png" alt="" />
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="img-box b-4">
                    <img src="images/hot-3.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="carousel_btn-box">
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div class=" col-md-5 offset-md-1">
            <div class="detail-box">
              <h1>
                Find <br>
                Food
              </h1>
              <p>
                Hungry? find out foods here.
              </p>

              <div class="btn-box">
                <a href="tel:+447440592288" class="btn-1">
                  Contact Us
                </a>
                <a href="views/register.php" class="btn-2">
                  Request Food
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end slider section -->
  </div>

  

  

  <!-- end hot section -->

  <!-- app section -->

  
  <!-- end app section -->

  <!-- client section -->

  
  <!-- end client section -->

  <!-- contact section -->

  

  <!-- end contact section -->

  <!-- subscribe section -->

  

  <!-- end subscribe section -->

  <!-- footer section -->
  
  <!-- footer section -->

  <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="js/bootstrap.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js">
  </script>

  <script>
    function openNav() {
      document.getElementById("myNav").classList.toggle("menu_width");
      document
        .querySelector(".custom_menu-btn")
        .classList.toggle("menu_btn-style");
    }
  </script>

  <!-- owl carousel script -->
  <script type="text/javascript">
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 35,
      navText: [],
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
  </script>
  <!-- end owl carousel script -->

</body>

</html>