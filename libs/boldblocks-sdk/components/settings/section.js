/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
const SectionStyled = styled.div`
  .settings-section__description {
    margin: 1em 0;
    font-size: 1.1em;
    font-weight: 500;
  }

  .meta-box-sortables {
    @media (min-width: 1080px) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
      gap: 1rem;

      .postbox {
        margin-bottom: 0;
      }
    }
  }
`;

export const Section = ({ title, description, children }) => {
  return (
    <SectionStyled className="settings-section">
      {title && <h3 className="settings-section__title">{title}</h3>}
      {description && (
        <p className="settings-section__description">{description}</p>
      )}
      <div className="meta-box-sortables">{children}</div>
    </SectionStyled>
  );
};
