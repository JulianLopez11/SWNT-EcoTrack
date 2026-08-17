# Vibe Report — EcoTrack

**Autor:** Julian Lopez  
**Proyecto:** SWNT-EcoTrack  
**Herramientas:** Cursor IDE + Replit + NestJS

---

## Reflexión sobre configuración y flujo de trabajo

EcoTrack nació con una premisa clara: construir un MVP funcional delegando la implementación técnica a la IA, mientras yo me concentraba en la intención del producto, la arquitectura y los criterios de calidad. En lugar de escribir cada línea manualmente, definí primero *qué* debía hacer el sistema y *cómo* debía organizarse, y dejé que Cursor ejecutara el *cómo* a nivel de código.

### Configuración de la IA: `.cursorrules`

El archivo [`.cursorrules`](./.cursorrules) actúa como el contrato entre mi visión y el agente. No es un prompt genérico: establece el rol (Senior Backend Developer en NestJS), las convenciones arquitectónicas (módulos, controllers delgados, services con lógica de negocio), reglas de testing con Jest, y restricciones explícitas como no integrar IA externa en el MVP ni agregar funcionalidades fuera de alcance. Esto evita deriva de scope y mantiene coherencia en cada iteración.

La decisión más importante fue separar el parsing del cálculo de emisiones mediante una interfaz `ActivityParser`. Así, el MVP usa reglas basadas en patrones, pero el diseño ya contempla reemplazar ese componente por un servicio de IA sin reescribir controllers ni la capa de emisiones. La IA implementó; yo diseñé el punto de extensión.

### Flujo Cursor ↔ Replit

El ecosistema se divide en dos capas complementarias:

| Entorno | Rol |
|---------|-----|
| **Cursor** | Diseño, iteración con IA, pruebas unitarias, refactor y reglas persistentes |
| **Replit** | Ejecución en la nube, demo pública y validación del prototipo desplegado |

En Cursor desarrollé la arquitectura modular (`carbon`, `parsing`, `emissions`), generé 22 pruebas unitarias y resolví un bug sutil en el parser (el separador de segmentos partía decimales como `12,5 km`). En Replit importé el repositorio de GitHub para verificar que el servidor arranca con `0.0.0.0` y el puerto dinámico de la nube, confirmando que el prototipo no depende del entorno local.

### Mentalidad Vibe Coding

Vibe coding, para mí, no es "no entender el código". Es invertir el esfuerzo: más tiempo en definir requisitos, revisar diffs y validar comportamiento. En este caso prioricé la intención ("interpretar lenguaje natural de huella de carbono") sobre la implementación manual de regex o factores de emisión, pero revisé cada módulo para asegurar testabilidad y separación de responsabilidades.

La IA resolvió problemas complejos (orquestación NestJS, inyección por token, validación con DTOs); yo validé que la solución fuera mínima, extensible y alineada con la rúbrica. El resultado es un backend que compila, pasa tests y expone un endpoint REST claro — construido colaborativamente, no copiado sin criterio.
