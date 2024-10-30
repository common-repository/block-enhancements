/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { FormFileUpload } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";

const SVGUploadControl = ({ label = __("Upload SVG"), onChange, ...props }) => {
  const { createWarningNotice } = useDispatch(noticesStore);
  return (
    <FormFileUpload
      accept=".svg"
      variant="primary"
      onChange={(event) => {
        const file = event.target.files[0];
        if (file.type !== "image/svg+xml") {
          createWarningNotice(
            __("Only support SVG format. Please upload a SVG file."),
            {
              type: "snackbar",
            }
          );
        } else {
          if (file.size > 500000) {
            createWarningNotice(
              __("Max file size is 0.5Mb. Please upload a smaller SVG file."),
              {
                type: "snackbar",
              }
            );
          } else {
            const reader = new FileReader();
            reader.onload = function (e) {
              onChange(e.target.result);
            };
            reader.readAsText(file);
          }
        }
      }}
      {...props}
    >
      {label}
    </FormFileUpload>
  );
};

export default SVGUploadControl;
