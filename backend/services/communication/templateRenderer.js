// ============================================================
// DATALATTICE TEMPLATE RENDERER
// ============================================================
//
// Converts database-driven message templates into final messages.
//
// Example:
//
// Template:
// "Hello {{student_name}}, your class starts at {{class_time}}."
//
// Variables:
// {
//   student_name: "Rahul",
//   class_time: "10:00 AM"
// }
//
// Result:
// "Hello Rahul, your class starts at 10:00 AM."
//
// ============================================================


// ============================================================
// NORMALIZE VARIABLES
// ============================================================

const normalizeVariables = (
  variables
) => {

  if (
    !variables ||
    typeof variables !== "object" ||
    Array.isArray(variables)
  ) {
    return {};
  }

  return variables;

};


// ============================================================
// CONVERT VALUE TO STRING
// ============================================================

const valueToString = (
  value
) => {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (
    typeof value === "object"
  ) {
    return JSON.stringify(
      value
    );
  }

  return String(value);

};


// ============================================================
// RENDER TEMPLATE
// ============================================================

const renderTemplate = (
  template,
  variables = {}
) => {

  if (
    template === null ||
    template === undefined
  ) {
    return "";
  }

  const normalizedVariables =
    normalizeVariables(
      variables
    );

  const templateString =
    String(template);

  return templateString.replace(
    /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g,
    (
      fullMatch,
      variableName
    ) => {

      const path =
        variableName.split(".");

      let value =
        normalizedVariables;

      for (
        const key of path
      ) {

        if (
          value === null ||
          value === undefined
        ) {
          return "";
        }

        value =
          value[key];

      }

      return valueToString(
        value
      );

    }
  );

};


// ============================================================
// RENDER MESSAGE TEMPLATE
// ============================================================

const renderMessageTemplate = ({
  subjectTemplate,
  bodyTemplate,
  variables = {},
}) => {

  return {

    subject:
      renderTemplate(
        subjectTemplate,
        variables
      ),

    body:
      renderTemplate(
        bodyTemplate,
        variables
      ),

  };

};


// ============================================================
// EXTRACT VARIABLES
// ============================================================

const extractVariables = (
  template
) => {

  if (
    template === null ||
    template === undefined
  ) {
    return [];
  }

  const templateString =
    String(template);

  const matches =
    templateString.match(
      /{{\s*([a-zA-Z0-9_.-]+)\s*}}/g
    );

  if (!matches) {
    return [];
  }

  const variables =
    matches.map(
      (match) => {

        return match
          .replace(
            /^{{\s*/,
            ""
          )
          .replace(
            /\s*}}$/,
            ""
          )
          .trim();

      }
    );

  return [
    ...new Set(
      variables
    ),
  ];

};


// ============================================================
// VALIDATE REQUIRED VARIABLES
// ============================================================

const validateTemplateVariables = (
  template,
  variables = {}
) => {

  const requiredVariables =
    extractVariables(
      template
    );

  const normalizedVariables =
    normalizeVariables(
      variables
    );

  const missingVariables =
    requiredVariables.filter(
      (variableName) => {

        const path =
          variableName.split(".");

        let value =
          normalizedVariables;

        for (
          const key of path
        ) {

          if (
            value === null ||
            value === undefined
          ) {
            return true;
          }

          value =
            value[key];

        }

        return (
          value === null ||
          value === undefined ||
          value === ""
        );

      }
    );

  return {

    valid:
      missingVariables.length === 0,

    requiredVariables,

    missingVariables,

  };

};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

  renderTemplate,

  renderMessageTemplate,

  extractVariables,

  validateTemplateVariables,

};