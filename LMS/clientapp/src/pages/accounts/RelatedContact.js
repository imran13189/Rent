import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const RelatedContact = ({ accountId }) => {
  const { accountContactData } = useSelector((state) => state.accounts);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const data = accountContactData.filter((row) => {
      return row.AccountId == accountId;
    });
    setContactData(data[0]?.ProductsAsJson);
  }, [accountContactData]);

  return contactData?.map((item) => {
    return (
      <>
        <HtmlTooltip title={item.FirstName+" "+item.LastName} placement="top" arrow>
          <div class="dot_div">
            <span class="dot">{item.contactNameAlias}</span>
          </div>
        </HtmlTooltip>
      </>
    );
  });
};

export default RelatedContact;
