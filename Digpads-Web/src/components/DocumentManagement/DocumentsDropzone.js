
import { useEffect, useRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Dropzone components
import Dropzone from 'dropzone';

// Dropzone styles
import 'dropzone/dist/dropzone.css';

// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const DocumentDropzoneRoot =  styled(Box)(({ theme }) => {
  const { palette, typography, borders, functions } = theme;

  const { text, white, dark, inputColors } = palette;
  const { size } = typography;
  const { borderRadius, borderWidth } = borders;
  const { rgba } = functions;

  return {
    display: "flex",
    alignItems: "center",
    border: `${borderWidth[1]} solid ${inputColors.borderColor.main} !important`,
    borderRadius: borderRadius.md,

    "& .dz-default": {
      margin: "0 auto !important",
    },

    "& .dz-default .dz-button": {
      color: `${text.main} !important`,
      fontSize: `${size.sm} !important`,
    },

    "& .dz-preview .dz-details": {
      color: `${dark.main} !important`,
      opacity: "1 !important",

      "& .dz-size span, & .dz-filename span": {
        backgroundColor: `${rgba(white.main, 0.7)} !important`,
      },
    },

    "& .dz-error-message": {
      display: "none !important",
    },

    "& .dz-remove": {
      color: `${dark.main} !important`,
      textDecoration: "none",

      "&:hover, &:focus": {
        textDecoration: "none !important",
      },
    },
  };
});


function DocumentDropzone({ options }) {
	const dropzoneRef = useRef();

	useEffect(() => {
		Dropzone.autoDiscover = false;

		function createDropzone() {
			return new Dropzone(dropzoneRef.current, { ...options });
		}

		function removeDropzone() {
			if (Dropzone.instances.length > 0)
				Dropzone.instances.forEach((dz) => dz.destroy());
		}

		createDropzone();

		return () => removeDropzone();
	}, [options]);

	return (
		<DocumentDropzoneRoot
			component='div'
			action='#'
			ref={dropzoneRef}
			className='form-control dropzone'
		>
			<SuiBox className='fallback'>
				<SuiBox component='input' name='file' type='file' multiple />
			</SuiBox>
		</DocumentDropzoneRoot>
	);
}

// Typechecking props for the DocumentDropzone
DocumentDropzone.propTypes = {
	options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DocumentDropzone;