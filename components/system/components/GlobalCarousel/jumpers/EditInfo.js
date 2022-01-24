import * as React from "react";
import * as Styles from "~/common/styles";
import * as System from "~/components/system";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";

import { css } from "@emotion/react";
import { useForm } from "~/common/hooks";

import Field from "~/components/core/Field";

const STYLES_EDIT_INFO_INPUT = (theme) => css`
  width: 100%;
  max-width: unset;
  box-shadow: 0 0 0 1px ${theme.semantic.borderGrayLight4} inset;
  border-radius: 12px;
  background-color: transparent;
  color: ${theme.semantic.textBlack};
`;

const STYLES_EDIT_INFO_NOTES_INPUT = (theme) => css`
  width: 100%;
  max-width: unset;
  box-shadow: 0 0 0 1px ${theme.semantic.borderGrayLight4} inset;
  border-radius: 12px;
  background-color: transparent;
  color: ${theme.semantic.textBlack};
  min-height: 120px;
`;

const STYLES_EDIT_INFO_FOOTER = (theme) => css`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${theme.semantic.bgWhite};
  border-top: 1px solid ${theme.semantic.borderGrayLight};
`;

const STYLES_EDIT_INFO_FORM = css`
  flex-grow: 1;
  overflow-y: auto;
  height: 270px;
`;

function UpdateFileForm({ file, children, isMobile, onClose }) {
  const formRef = React.useRef();

  const { getFieldProps, getFormProps, isSubmitting } = useForm({
    initialValues: {
      title: file?.name || "",
      notes: file?.body || "",
    },
    onSubmit: async ({ title, notes }) => {
      const response = await Actions.updateFile({
        id: file.id,
        name: title,
        body: notes,
      });
      onClose();
      Events.hasError(response);
    },
  });

  //NOTE(amine): scroll to the bottom of the form every time the notes' textarea resizes
  const scrollToFormBottom = () => {
    const form = formRef.current;
    if (!form) return;
    form.scrollTop = form.scrollHeight - form.clientHeight;
  };

  const JumperItem = isMobile ? MobileJumper.Content : Jumper.Item;

  return (
    <>
      <form ref={formRef} css={STYLES_EDIT_INFO_FORM} {...getFormProps()}>
        <JumperItem>
          <div>
            <System.H6 as="label" color="textGray">
              Title
            </System.H6>
            <Field
              full
              inputCss={STYLES_EDIT_INFO_INPUT}
              autoFocus
              style={{ marginTop: 6 }}
              {...getFieldProps("title")}
            />
          </div>
          <div>
            <System.H6 as="label" color="textGray">
              Notes
            </System.H6>
            <System.Textarea
              css={STYLES_EDIT_INFO_NOTES_INPUT}
              style={{ marginTop: 6 }}
              maxLength="2000"
              {...getFieldProps("notes", { onChange: scrollToFormBottom })}
            />
          </div>
        </JumperItem>

        {children({ isSubmitting })}
      </form>
      <div style={{ height: 50 }} />
    </>
  );
}

/* -----------------------------------------------------------------------------------------------*/

export function EditInfo({ file, onClose }) {
  return (
    <Jumper.Root onClose={onClose}>
      <Jumper.Header>
        <System.H5 color="textBlack">Edit info</System.H5>
        <Jumper.Dismiss />
      </Jumper.Header>
      <Jumper.Divider />
      <Jumper.ObjectInfo file={file} />
      <Jumper.Divider />
      <UpdateFileForm key={file.id} file={file} isMobile={false} onClose={onClose}>
        {({ isSubmitting }) => (
          <Jumper.Item css={STYLES_EDIT_INFO_FOOTER}>
            <System.ButtonSecondary
              type="button"
              onClick={onClose}
              style={{
                marginLeft: "auto",
                minHeight: "24px",
                padding: "1px 12px 3px",
                borderRadius: "8px",
              }}
            >
              Cancel
            </System.ButtonSecondary>
            <System.ButtonPrimary
              type="submit"
              style={{
                marginLeft: "8px",
                minHeight: "24px",
                padding: "1px 12px 3px",
                borderRadius: "8px",
              }}
              loading={isSubmitting}
            >
              Save
            </System.ButtonPrimary>
          </Jumper.Item>
        )}
      </UpdateFileForm>
    </Jumper.Root>
  );
}

export function EditInfoMobile({ file, footerStyle, withDismissButton, onClose }) {
  return (
    <MobileJumper.Root onClose={onClose}>
      <System.Divider height={1} color="borderGrayLight" />
      <MobileJumper.ObjectInfo file={file} onClick={onClose} />
      <System.Divider height={1} color="borderGrayLight" />
      <MobileJumper.Header>
        <System.H5 as="p" color="textBlack">
          Edit Info
        </System.H5>
        {withDismissButton ? <MobileJumper.Dismiss /> : null}
      </MobileJumper.Header>
      <System.Divider height={1} color="borderGrayLight" />
      <UpdateFileForm isMobile key={file.id} file={file} onClose={onClose}>
        {({ isSubmitting }) => (
          <MobileJumper.Footer style={footerStyle} css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
            <System.ButtonSecondary
              type="button"
              full
              onClick={onClose}
              style={{ padding: "9px 24px 11px", minHeight: "24px" }}
            >
              Cancel
            </System.ButtonSecondary>
            <System.ButtonPrimary
              type="submit"
              full
              style={{ marginLeft: "8px", padding: "9px 24px 11px", minHeight: "24px" }}
              loading={isSubmitting}
            >
              Save
            </System.ButtonPrimary>
          </MobileJumper.Footer>
        )}
      </UpdateFileForm>
    </MobileJumper.Root>
  );
}
