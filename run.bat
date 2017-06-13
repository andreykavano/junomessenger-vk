@echo off
title NodeJS: %~1
:while1
node --expose_gc %~1
pause
goto :while1