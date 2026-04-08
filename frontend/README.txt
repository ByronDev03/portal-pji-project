¿CÓMO CREAR UN PROYECTO DESDE CERO EN ANGULAR EN WINDOWS?

1. CREAR UN NUEVO PROYECTO
   1.1 Ve a la carpeta donde quieras tu proyecto, por ejemplo:
       cd C:\Users\Dell\Documents
   1.2 Crea el proyecto
	 ng new nombre-del-proyecto
   1.3 El CLI te preguntará
	  * Which stylesheet format would you like to use? --> SCSS
        * Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? --> Yes
        * Do you want to create a 'zoneless' application without zone.js? --> Yes
        * Which AI tools do you want to configure with Angular best practices? --> None
       Esto generará una carpeta "nombrel-del-proyecto" con toda la estructura Angular.

2. ENTRA AL PROYECTO
   cd nombre-del-proyecto

3. LEVANTAR EL SERVIDOR DE DESARROLLO
   ng serve -o
   Esto abre en tu navegador http://localhost:4200/ con tu app corriendo.
    NOTA:
     * ng serve: Inicia el servidor, tú abres el navegador.
     * ng serve -o: Inicia el servidor y abre el navegador automáticamente.


DESCRIPCIÓN DE CADA SECCIÓN PRINCIPAL

|           Sección              |                Propósito                    |                                                                                                    Explicación                                                                                                                                                                                                                                 |
| ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header                         | Navegación principal                        | Contiene el logotipo y los enlaces a las secciones clave del sitio. Permite al usuario moverse fácilmente entre *Inicio*, *Planes*, *FAQ* o *Contratar*. Se mantiene fijo (sticky) para mejorar la usabilidad.                              |
| Hero                           | Llamada de atención y conversión principal  | Es la primera impresión del usuario. Presenta el mensaje principal de la empresa (“Protege tu patrimonio...”) junto con un botón de acción (“Ver Pólizas”). Su objetivo es captar la atención y dirigir al usuario hacia el siguiente paso. |
| Proceso / ¿Cómo funciona?      | Explicación simple del servicio             | Detalla los pasos que el cliente debe seguir para obtener la póliza. Su propósito es simplificar la comprensión del proceso y reducir fricciones. Refuerza la percepción de facilidad y rapidez.                                            |
| Planes / Pólizas               | Comparación de opciones                     | Presenta las distintas pólizas con sus precios y beneficios. Está pensada para que el usuario identifique rápidamente cuál plan le conviene y lo pueda contratar fácilmente. Es el núcleo comercial del sitio.                              |
| FAQ (Preguntas Frecuentes)     | Resolución de dudas                         | Responde de manera clara a las preguntas más comunes antes de la contratación. Reduce la incertidumbre y mejora la tasa de conversión al resolver objeciones sin necesidad de atención directa.                                             |
| Footer                         | Información legal y enlaces complementarios | Cierra la página proporcionando los enlaces secundarios (Aviso de privacidad, FAQ, contacto) y datos de la empresa. También refuerza la identidad visual con el logotipo y enlaces a redes sociales.                                        |



Desarrollado por Byron Jorge Ortega Cuenca.
Proyecto construido con Angular 20.3.2, TypeScript y SCSS.