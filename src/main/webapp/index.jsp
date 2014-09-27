<html>
<head>
  <title>Tschehel Sotoun (Three.js)</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <!-- CSS -->
    <link rel=stylesheet href="/css/base.css"/>

    <!-- JS-->
    <script src="js/lib/three.js"></script>
    <script src="js/lib/detector.js"></script>
    <script src="js/lib/stats.js"></script>
    <script src="js/lib/OrbitControls.js"></script>
    <script src="js/lib/THREEx.KeyboardState.js"></script>
    <script src="js/lib/THREEx.Fullscreen.js"></script>
    <script src="js/lib/THREEx.WindowResize.js"></script>
    <script src="js/constants.js"></script>
    <script src="js/lib/tween.js"></script>
    <script src="js/lib/tree.js"></script>
    <script src="js/init.js"></script>
    <script src="js/utilities.js"></script>
    <script src="js/tschehelSotoun.js"></script>
</head>
<body>
<!-- http://www.lughertexture.com/vegetation-plants-textures/oak-tree-medium-texture-tree-png-with-alpha#joomimg -->
<!-- http://stemkoski.github.io/Three.js/Shader-Animate.html-->
<!-- http://stemkoski.github.io/Three.js/Camera-Texture.html-->
<!-- http://www.goodtextures.com/ -->
<jsp:include page="shader.jsp"/>
<div id="canvas" style="z-index: 1; position: absolute; left:0px; top:0px"></div>
</body>
</html>
