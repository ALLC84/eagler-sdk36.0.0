class FunctionSetPhase {
   
   static getPhaseHierrosCortos = (tiempo, handicap) => {
      //console.log('Tiempo Hierros Cortos: => ',tiempo, 'handicap: =>', handicap);

      switch(true){
         case handicap < 7:
            if(tiempo > 1680){
               return 6
            } else if(tiempo > 1320){
               return 5
            } else if(tiempo > 840){
               return 4
            } else if(tiempo > 420) {
               return 3
            } else {return 2}
         
         case handicap < 16: 
            if(tiempo > 1800){
               return 6
            } else if(tiempo > 1560){
               return 5
            } else if(tiempo > 1020){
               return 4
            } else if(tiempo > 540) {
               return 3
            } else if(tiempo > 60) {
               return 2
            } else {return 1}

         case handicap < 26: 
            if(tiempo > 2280){
               return 6
            } else if(tiempo > 2040){
               return 5
            } else if(tiempo > 1380){
               return 4
            } else if(tiempo > 780) {
               return 3
            } else if(tiempo > 180) {
               return 2
            } else {return 1}


         case handicap <= 36: 
            if(tiempo > 2760){
               return 6
            } else if(tiempo > 2460){
               return 5
            } else if(tiempo > 1680){
               return 4
            } else if(tiempo > 960) {
               return 3
            } else if(tiempo > 240) {
               return 2
            } else {return 1}

      }
      
   }

   static getPhaseHierrosLargos = (tiempo, handicap) => {
      //console.log('Tiempo Hierros Largos: => ',tiempo, 'handicap: =>', handicap);

      switch(true){
         case handicap < 7:
            if(tiempo > 1860){
               return 6
            } else if(tiempo > 1440){
               return 5
            } else if(tiempo > 960){
               return 4
            } else if(tiempo > 480) {
               return 3
            } else {return 2}
         
         case handicap < 16: 
            if(tiempo > 2280){
               return 6
            } else if(tiempo > 1800){
               return 5
            } else if(tiempo > 1260){
               return 4
            } else if(tiempo > 720) {
               return 3
            } else if(tiempo > 180) {
               return 2
            } else {return 1}
         
         case handicap < 26: 
            if(tiempo > 3060){
               return 6
            } else if(tiempo > 2460){
               return 5
            } else if(tiempo > 1800){
               return 4
            } else if(tiempo > 1140) {
               return 3
            } else if(tiempo > 480) {
               return 2
            } else {return 1}
         
         case handicap <= 36: 
            if(tiempo > 3780){
               return 6
            } else if(tiempo > 3060){
               return 5
            } else if(tiempo > 2280){
               return 4
            } else if(tiempo > 1500) {
               return 3
            } else if(tiempo > 720) {
               return 2
            } else {return 1}
         
      }

   }

   static getPhaseMaderas = (tiempo, handicap) => {
      //console.log('Tiempo Maderas: => ',tiempo, 'handicap: =>', handicap);

      switch(true){
         case handicap < 7:
            if(tiempo > 1560){
               return 6
            } else if(tiempo > 1140){
               return 5
            } else if(tiempo > 660){
               return 4
            } else if(tiempo > 300) {
               return 3
            } else {return 2}
         
         case handicap < 16: 
            if(tiempo > 2160){
               return 6
            } else if(tiempo > 1680){
               return 5
            } else if(tiempo > 1140){
               return 4
            } else if(tiempo > 600) {
               return 3
            } else if(tiempo > 180) {
               return 2
            } else {return 1}
         
         case handicap < 26: 
            if(tiempo > 2880){
               return 6
            } else if(tiempo > 2280){
               return 5
            } else if(tiempo > 1620){
               return 4
            } else if(tiempo > 960) {
               return 3
            } else if(tiempo > 360) {
               return 2
            } else {return 1}
         
         case handicap <= 36: 
            if(tiempo > 3540){
               return 6
            } else if(tiempo > 2820){
               return 5
            } else if(tiempo > 2040){
               return 4
            } else if(tiempo > 1260) {
               return 3
            } else if(tiempo > 480) {
               return 2
            } else {return 1}
         
      }

   }

   static getPhaseDrive = (tiempo, handicap) => {
      //console.log('Tiempo Drive: => ',tiempo, 'handicap: =>', handicap);

      switch(true){
         case handicap < 7:
            if(tiempo > 1560){
               return 6
            } else if(tiempo > 1140){
               return 5
            } else if(tiempo > 660){
               return 4
            } else if(tiempo > 300) {
               return 3
            } else {return 2}
         
         case handicap < 16: 
            if(tiempo > 2160){
               return 6
            } else if(tiempo > 1680){
               return 5
            } else if(tiempo > 1140){
               return 4
            } else if(tiempo > 600) {
               return 3
            } else if(tiempo > 180) {
               return 2
            } else {return 1}
         
         case handicap < 26: 
            if(tiempo > 2880){
               return 6
            } else if(tiempo > 2280){
               return 5
            } else if(tiempo > 1620){
               return 4
            } else if(tiempo > 960) {
               return 3
            } else if(tiempo > 360) {
               return 2
            } else {return 1}
         
         case handicap <= 36: 
            if(tiempo > 3540){
               return 6
            } else if(tiempo > 2820){
               return 5
            } else if(tiempo > 2040){
               return 4
            } else if(tiempo > 1260) {
               return 3
            } else if(tiempo > 480) {
               return 2
            } else {return 1}

      }

   }

   static getPhaseApproach = (tiempo, handicap) => {
      //console.log('Tiempo Approach: => ',tiempo, 'handicap: =>', handicap);

      switch(true){
         case handicap < 7:
            if (tiempo > 1740){
               return 5
            } else if (tiempo > 1260){
               return 4
            }  else if(tiempo > 840) {
               return 3
            } else if(tiempo > 420) {
               return 2
            } else {return 1}
         
         case handicap < 16: 
            if (tiempo > 2160){
               return 5
            } else if (tiempo > 1620){
               return 4
            }  else if(tiempo > 1080) {
               return 3
            } else if(tiempo > 540) {
               return 2
            } else {return 1}
         

         case handicap < 26: 
            if (tiempo > 2640){
               return 5
            } else if (tiempo > 1980){
               return 4
            }  else if(tiempo > 1320) {
               return 3
            } else if(tiempo > 660) {
               return 2
            } else {return 1}
         

         case handicap <= 36: 
            if (tiempo > 3120){
               return 5
            } else if (tiempo > 2340){
               return 4
            }  else if(tiempo > 1560) {
               return 3
            } else if(tiempo > 780) {
               return 2
            } else {return 1}
         
      }
      
   }

   static getPhasePutt = (tiempo, handicap) => {
      //console.log('Tiempo Putt: => ',tiempo, 'handicap: =>', handicap);

      switch(true){
         case handicap < 7:
            if (tiempo > 1560){
               return 5
            } else if (tiempo > 1200){
               return 4
            }  else if(tiempo > 720) {
               return 3
            } else if(tiempo > 360) {
               return 2
            } else {return 1}
         
         case handicap < 16: 
            if (tiempo > 1800){
               return 5
            } else if (tiempo > 1380){
               return 4
            }  else if(tiempo > 840) {
               return 3
            } else if(tiempo > 420) {
               return 2
            } else {return 1}
         

         case handicap < 26: 
            if (tiempo > 2700){
               return 5
            } else if (tiempo > 2040){
               return 4
            }  else if(tiempo > 1360) {
               return 3
            } else if(tiempo > 660) {
               return 2
            } else {return 1}
         

         case handicap <= 36: 
            if (tiempo > 3180){
               return 5
            } else if (tiempo > 2400){
               return 4
            }  else if(tiempo > 1560) {
               return 3
            } else if(tiempo > 780) {
               return 2
            } else {return 1}
         
      }
      
   }

}

export default FunctionSetPhase;