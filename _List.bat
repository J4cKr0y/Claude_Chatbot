@echo off
setlocal enabledelayedexpansion

:: Répertoire de base (l'emplacement du script)
set "basedir=%~dp0"

:: Fichier de sortie avec chemins relatifs
set "outputfile=_RelativeFilelist.txt"

:: Suppression du fichier précédent s'il existe
if exist "%outputfile%" del "%outputfile%"

:: Génération de la liste des fichiers
for /f "delims=" %%i in ('dir /b /s /A-D /o:gn') do (
    set "filepath=%%i"
    call set "relpath=%%filepath:%basedir%=%%"
    echo !relpath! >> "%outputfile%"
)

echo Liste des chemins relatifs générée dans %outputfile%
pause