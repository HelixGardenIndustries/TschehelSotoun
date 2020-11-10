function addArrowKeyHandler() {
    var moveOffset = 10;
    var instensityOffset = 10;
    var distanceOffset = 50;
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                light.position.x = light.position.x + moveOffset;
                break;
            case 38:
                light.position.z = light.position.z - moveOffset;
                break;
            case 39:
                light.position.x = light.position.x - moveOffset;
                break;
            case 40:
                light.position.z = light.position.z + moveOffset;
                break;
            case 49:
                light.intensity = light.intensity - instensityOffset;
                break;
            case 50:
                light.intensity = light.intensity + instensityOffset;
                break;
            case 51:
                light.distance = light.distance - distanceOffset;
                break;
            case 52:
                light.distance = light.distance + distanceOffset;
                break;
        }
    };
}
