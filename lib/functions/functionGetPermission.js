import { Permissions } from "expo";

class functionGetPermission {

   //Permisos Galeria de fotos
   static getPermissionLibrary = async () => {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      
		return status;
   };
   
   //Permisos Camara
   static getPermissionCameraRoll = async () => {
		await Permissions.askAsync(Permissions.CAMERA);
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      
		return status;
	};

}
export default functionGetPermission;