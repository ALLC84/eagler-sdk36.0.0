import { DB } from '../../services/firebase';

class functionUserProfile {
   /* PERFIL JUEGO
   |  =====================================
   |  Funciones que actualizan el perfil de juego
   */

	// Año Inicio
	static setAnioInicio(userId, anioInicio) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				anioInicio
			});
	}
	//Handicap
	static setHandicap(userId, handicap) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				handicap
			});
	}
	// Dias juego a la semana
	static setDiasJuegoSemana(userId, diasJuegoSemana) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				diasJuegoSemana
			});
	}
	// Dias entrenamiento a la semana
	static setDiasEntrenamientoSemana(userId, diasEntrenamientoSemana) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				diasEntrenamientoSemana
			});
	}
	// Mano
	static setMano(userId, mano) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				mano
			});
	}

	//Actualiza todo el perfil de juego de una vez
	static updateProfileJuego(
		userId,
		anioInicio,
		handicap,
		diasJuegoSemana,
		diasEntrenamientoSemana,
		mano
	) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				anioInicio,
				handicap,
				diasJuegoSemana,
				diasEntrenamientoSemana,
				mano
			});
   }
   

   /* PERFIL FISICO
   |  =====================================
   |  Funciones que actualizan el perfil de juego
   */
   //Name
   static setName(userId, name) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            name
         });
   }

   // Lasname
   static setLasname(userId, lasName) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            lasName
         });
   }

   // NickName
   static setUsuario(userId, nickName) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            nickName
         });
   }

   // Image
   static setImage(userId, avatarImg) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            avatarImg
         });
   }

   //altura
   static setAltura(userId, altura) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            altura
         });
   }

   // Año nacimiento
   static setAnioNacimiento(userId, anioNacimiento) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            anioNacimiento
         });
   }

   // Fecha Nacimiento
   static setFechaNacimiento(userId, fechaNacimiento) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            fechaNacimiento
         });
   }

   // Peso
   static setPeso(userId, peso) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            peso
         });
   }
   // Sexo
   static setSexo(userId, sexo) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            sexo
         });
   }

	//Actualiza todo el perfil fisico de una vez
	static updateProfileFisico(
      userId, 
      altura, 
      peso, 
      sexo, 
      anioNacimiento) {

		return DB
			.collection("users")
			.doc(userId)
			.update({
				altura,
				peso,
				sexo,
				anioNacimiento
			});
	}

   /* ABILIDADES
   |  =====================================
   |  Funciones que actualizan las abilidades 
   */

   // Tiempo Hierros Cortos
   static setTiempoHierrosCortos(userId, tiempoHierrosCortos) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            tiempoHierrosCortos
         });
   }
   // Tiempo Hierros Largos
   static setTiempoHierrosLargos(userId, tiempoHierrosLargos) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            tiempoHierrosLargos
         });
   }
   // Tiempo Maderas
   static setTiempoMaderas(userId, tiempoMaderas) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            tiempoMaderas
         });
   }

   // Tiempo Drive
   static setTiempoDrive(userId, tiempoDrive) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            tiempoDrive
         });
   }

   // Tiempo Approach
   static setTiempoApproach(userId, tiempoApproach) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            tiempoApproach
         });
   }

   // Tiempo Putt
   static setTiempoPutt(userId, tiempoPutt) {
      return DB
         .collection("users")
         .doc(userId)
         .update({
            tiempoPutt
         });
   }

   //Actualiza puntos abilidades
	static updateAbility(userId, tiempo) {
		return DB
			.collection("users")
			.doc(userId)
			.update({
				tiempoHierrosCortos: Math.floor(tiempo.tiempoHierrosCortos),
				tiempoHierrosLargos: Math.floor(tiempo.tiempoHierrosLargos),
				tiempoMaderas: Math.floor(tiempo.tiempoMaderas),
				tiempoDrive: Math.floor(tiempo.tiempoDrive),
				tiempoApproach: Math.floor(tiempo.tiempoApproach),
				tiempoPutt: Math.floor(tiempo.tiempoPutt)
			});
   }
   
   // Define tiempos hablidades
   static defineTiempoHabilidades = (userId, tiempo) => {
      const docRef = DB.collection("users").doc(userId);
		docRef
			.get()
			.then(doc => {
				if (doc.exists) {
               const data = doc.data();

               let tiempos = {
                  tiempoHierrosCortos: parseInt(data.tiempoHierrosCortos) + (tiempo * .15),
                  tiempoHierrosLargos: parseInt(data.tiempoHierrosLargos) + (tiempo * .15),
                  tiempoMaderas: parseInt(data.tiempoMaderas) + (tiempo * .10),
                  tiempoDrive: parseInt(data.tiempoDrive) + (tiempo * .10),
                  tiempoApproach: parseInt(data.tiempoApproach) + (tiempo * .25),
                  tiempoPutt: parseInt(data.tiempoPutt) + (tiempo * .20)
               }
					//console.log(tiempos, tiempo);
               this.updateAbility(userId, tiempos);
					
				} else {
					console.log("El documento esta vacio");
				}
			})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
   }


   /* FASE
   |  =====================================
   |  Crea fase la primera vez que rellena el handicap 
   */
	static createFase(userId, fase, handicap) {
		// TODO: Cambiar fase segun handicap cuando esten los videos creados en DB
		if (fase == "" || fase == undefined || fase == null) {
			handicap > 7 ? (fase = 1) : (fase = 1);

			return DB
				.collection("users")
				.doc(userId)
				.update({
               fase,
               tiempoHierrosCortos: 0,
               tiempoHierrosLargos: 0,
               tiempoMaderas: 0,
               tiempoDrive: 0,
               tiempoApproach: 0,
               tiempoPutt: 0
				});
		} else {
			return;
		}
	}
}

export default functionUserProfile;
