# pruebaTecnicaIonix

Los projectos estan creados con Node v16.17.0
Se uso Yarn para ejecutar e instalar las librerias
los dos projectos esta escritos con typescript

Para iniciar el serverApi es bajo la carpeta backend con 'yarn dev'
la base de datos usada es mySql, se puede cambiar las credenciales desde el archivo .env en caso de que den algun problema
para guardar las imagenes se realizo la conexioon con aws s3.
para visualizar rapidamente los endpoint desarrollados esta en src/routes/user

Para iniciar la app de react es bajo las carpetas frontEnd/app-test con 'yarn start'
Se uso la libreria de UI ant.design para acelerar un poco el desarrollo  
las credenciales para poder realizar el login son user:admin, password:admin

pd: no alcance a realizar los unit Test
