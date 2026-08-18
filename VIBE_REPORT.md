# Vibe Report — EcoTrack

**Autor:** Julian Lopez
**Proyecto:** SWNT-EcoTrack
**Herramientas:** Cursor IDE + GitHub + Replit + NestJS

## Reflexión sobre configuración y flujo de trabajo

EcoTrack nació con una premisa clara: construir un MVP funcional delegando la implementación técnica a la IA, mientras yo me concentraba en la intención del producto, la arquitectura y los criterios de calidad. En lugar de escribir cada línea manualmente, definí primero **qué debía hacer el sistema y cómo debía organizarse**, dejando que Cursor ejecutara el **cómo** a nivel de código.

### Configuración de la IA: `.cursorrules`

El archivo `.cursorrules` funciona como un contrato entre mi visión y el agente de IA. Define el rol de Senior Backend Developer, el stack tecnológico, las convenciones de NestJS, testing, seguridad, Git y reglas para el uso responsable de IA.

También establece límites explícitos para evitar deriva de alcance: no agregar funcionalidades no solicitadas ni integrar servicios externos de IA durante el MVP. Esto permite que las decisiones tomadas por Cursor mantengan coherencia durante las diferentes iteraciones.

Una decisión arquitectónica importante fue separar el parsing y el cálculo de emisiones mediante la interfaz `ActivityParser`. El MVP utiliza reglas basadas en patrones, pero esta separación permite reemplazar posteriormente el parser por un servicio de IA sin modificar los Controllers ni la lógica principal de emisiones. **La IA implementó; yo diseñé el punto de extensión.**

### Flujo Cursor → GitHub → Replit

El flujo de trabajo se dividió en tres responsabilidades:

| Entorno    | Responsabilidad                                                                  |
| ---------- | -------------------------------------------------------------------------------- |
| **Cursor** | Diseño, implementación asistida por IA, pruebas, refactor y aplicación de reglas |
| **GitHub** | Versionamiento y almacenamiento del código fuente                                |
| **Replit** | Ejecución en la nube, despliegue y validación del prototipo                      |

En Cursor desarrollé la arquitectura modular (`carbon`, `parsing` y `emissions`), generé las pruebas unitarias y resolví un bug del parser relacionado con la separación de segmentos que podía afectar valores decimales como `12,5 km`.

Posteriormente, el repositorio fue integrado con Replit para verificar que el servidor funcionara correctamente en el entorno de nube, utilizando `0.0.0.0` y el puerto dinámico proporcionado por la plataforma.

### Mentalidad Vibe Coding

Para mí, vibe coding no significa dejar de entender el código. Significa **cambiar dónde se invierte el esfuerzo**: menos tiempo escribiendo código repetitivo y más tiempo definiendo requisitos, arquitectura, restricciones, revisando diffs y validando resultados.

La IA resolvió tareas complejas de implementación, como la estructura de NestJS, inyección de dependencias, DTOs y pruebas. Mi responsabilidad fue mantener el control sobre la intención del producto, revisar las decisiones técnicas y verificar que el resultado fuera correcto, mínimo, extensible y mantenible.

El resultado es un backend funcional construido colaborativamente: **la IA acelera la implementación, mientras el desarrollador conserva el criterio arquitectónico y la responsabilidad sobre el resultado.**
