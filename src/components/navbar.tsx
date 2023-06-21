import { Button, FormControl, MenuItem, Select, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState('en')
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
  }
  const navigate = useNavigate()

  const NavbarCont = styled('div')`
    display: flex;
    flex-direction: row;
  `

  return (
    <NavbarCont>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          navigate(`/invoices`)
        }}
      >
        {t('INVOICES')}
      </Button>
      <Button
        onClick={(id) => {
          navigate(`/invoice/:${id}`)
        }}
        variant="text"
        color="primary"
      >
        {t('ADD_NEW')}
      </Button>
      <FormControl variant="standard" sx={{ minWidth: 100, paddingLeft: 2 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={(event) => changeLanguage(event.target.value)}
        >
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'pl'}>PL</MenuItem>
        </Select>
      </FormControl>
    </NavbarCont>
  )
}
