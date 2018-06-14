$(function() {
  var volume = new KVS.LobsterData();
  var screen = new KVS.THREEScreen();
  screen.init(volume, {
    width: window.innerWidth / 2,
    height: window.innerHeight,
    enableAutoResize: false,
  });

  var bounds = Bounds(volume);
  screen.scene.add(bounds);

  var isovalue = 128;
  var opacity = 1;
  var surfaces = Isosurfaces(volume, isovalue, opacity);
  screen.scene.add(surfaces);

  document.addEventListener('mousemove', function() {
    screen.light.position.copy(screen.camera.position);
  });

  window.addEventListener('resize', function() {
    screen.resize([window.innerWidth, window.innerHeight]);
  });

  var light = new THREE.PointLight();
  light.position.set( 5, 5, 5 );
  screen.scene.add( light );

  screen.loop();

  //isosurfaceを変更して再描画
  $('#iso_score').html($('#iso_bar').val());
  $('#iso_bar').on('input change', function() {
    $('#iso_score').html($(this).val());
    screen.scene.remove(surfaces);
    isovalue = $(this).val();
    surfaces = Isosurfaces(volume, isovalue, opacity);
    screen.scene.add(surfaces);
  });

  //Redを変更して再描画
  $('#R_score').html($('#R_bar').val());
  $('#R_bar').on('input change', function() {
    $('#R_score').html($(this).val());
    screen.scene.remove(surfaces);
    r_value = $(this).val();
    changeRedColor(r_value)
    surfaces = Isosurfaces(volume, isovalue, opacity);
    screen.scene.add(surfaces);
  });

  //Greenを変更して再描画
  $('#G_score').html($('#G_bar').val());
  $('#G_bar').on('input change', function() {
    $('#G_score').html($(this).val());
    screen.scene.remove(surfaces);
    g_value = $(this).val();
    changeGreenColor(g_value)
    surfaces = Isosurfaces(volume, isovalue, opacity);
    screen.scene.add(surfaces);
  });

  //Blueを変更して再描画
  $('#B_score').html($('#B_bar').val());
  $('#B_bar').on('input change', function() {
    $('#B_score').html($(this).val());
    screen.scene.remove(surfaces);
    b_value = $(this).val();
    changeBlueColor(b_value)
    surfaces = Isosurfaces(volume, isovalue, opacity);
    screen.scene.add(surfaces);
  });

  //不透明度を変更して再描画
  $('#opacity_score').html($('#opacity_bar').val());
  $('#opacity_bar').on('input change', function() {
    $('#opacity_score').html($(this).val());
    opacity = $(this).val();
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces(volume, isovalue ,opacity);
    screen.scene.add(surfaces);
  });

  //Shadingを指定する
  $('.square_btn_s').on('click', function(){
      var name = $(this).attr("id");
      $('#choosing_shading').val(name);
  });

  //Reflectionを指定する
  $('.square_btn_r').on('click', function(){
      var name = $(this).attr("id");
      $('#choosing_reflection').val(name);
  });

  //テキストボックスからShadingとReflectionを受け取って再描画する
  $('#shading_vis').on('click', function(){
      var shading = $('#choosing_shading').val();
      var reflection = $('#choosing_reflection').val();
      screen.scene.remove(surfaces);
      if(shading == "Gouraud"){
      surfaces = IsosurfacesWithGouraudShading(volume, isovalue, shading, reflection, screen);
    }else if(shading == "Phong"){
      surfaces = IsosurfacesWithPhongShading(volume, isovalue, shading, reflection, screen);
    }
      screen.scene.add(surfaces);
  });

  $('.initialize_btn').on('click', function(){
    screen.scene.remove(surfaces);
    $('#iso_bar').val(128);
    $('#iso_score').html(128);
    $('#R_bar').val(128);
    $('#R_score').html(128);
    $('#G_bar').val(128);
    $('#G_score').html(128);
    $('#B_bar').val(128);
    $('#B_score').html(128);
    //var surfaces = Isosurfaces(volume, isovalue);
    //screen.scene.add(surfaces);
  })

  $('#slice_vis').on('click', function(){
    screen.scene.remove(surfaces);
    var point_x = $('#point_x').val();
    var point_y = $('#point_y').val();
    var point_z = $('#point_z').val();
    var normal_x = $('#normal_x').val();
    var normal_y = $('#normal_y').val();
    var normal_z = $('#normal_z').val();
    console.log(point_x + " " + point_y + " " + point_z )
    var point = new THREE.Vector3( point_x, point_y ,point_z );
    var normal = new THREE.Vector3( normal_x ,normal_y ,normal_z );
    surfaces = IsosurfacesWithSlice(volume, isovalue, point, normal);
    screen.scene.add(surfaces);
  });
});
