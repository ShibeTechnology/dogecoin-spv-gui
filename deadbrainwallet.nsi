!define ZIP2EXE_COMPRESSOR_ZLIB
!define ZIP2EXE_INSTALLDIR "$LocalAppData\Programs\DeadbrainWallet"
!define ZIP2EXE_NAME "Deadbrain Wallet"
!define ZIP2EXE_OUTFILE "DeadbrainWallet_${TAG}_setup.exe"

!define MUI_ICON "dist\assets\logo_white.ico"

!define APPNAME "Deadbrain Wallet"
!define DESCRIPTION "A dogecoin wallet built by Deadbrain Corp."
# These three must be integers
; !define VERSIONMAJOR ${MAJOR}
; !define VERSIONMINOR ${MINOR}
; !define VERSIONBUILD ${BUILD}
# These will be displayed by the "Click here for support information" link in "Add/Remove Programs"
# It is possible to use "mailto:" links in here to open the email client
!define HELPURL "https://github.com/ShibeTechnology/dogecoin-spv-gui/" # "Support Information" link
!define UPDATEURL "https://github.com/ShibeTechnology/dogecoin-spv-gui/releases" # "Product Updates" link
!define ABOUTURL "https://github.com/ShibeTechnology/dogecoin-spv-gui/" # "Publisher" link
# This is the size (in kB) of all the files copied into "Program Files"
; !define INSTALLSIZE ${SIZE}

!include "${NSISDIR}\Contrib\zip2exe\Base.nsh"
!include "${NSISDIR}\Contrib\zip2exe\Modern.nsh"

!insertmacro SECTION_BEGIN
File /r "deploy\win32\build\DeadbrainWallet\*.*"
!insertmacro SECTION_END

!macro VerifyUserIsAdmin
UserInfo::GetAccountType
pop $0
${If} $0 != "admin" ;Require admin rights on NT4+
        messageBox mb_iconstop "Administrator rights required!"
        setErrorLevel 740 ;ERROR_ELEVATION_REQUIRED
        quit
${EndIf}
!macroend

section "install"

  SetOutPath $INSTDIR

  # Create a user directory for the data
  CreateDirectory "$APPDATA\${APPNAME}"

  # Uninstaller - See function un.onInit and section "uninstall" for configuration
  writeUninstaller "$INSTDIR\uninstall.exe"

  # Start Menu
  createDirectory "$SMPROGRAMS\${APPNAME}"
  createShortCut "$SMPROGRAMS\${APPNAME}\${APPNAME}.lnk" "$INSTDIR\qode.exe" "" "$INSTDIR\dist\assets\logo_white.ico"

  # Registry information for add/remove programs
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayName" "${APPNAME} - ${DESCRIPTION}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "InstallLocation" "$\"$INSTDIR$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayIcon" "$\"$INSTDIR\${MUI_ICON}$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "Publisher" "Lola"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "HelpLink" "$\"${HELPURL}$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "URLUpdateInfo" "$\"${UPDATEURL}$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "URLInfoAbout" "$\"${ABOUTURL}$\""
;   WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayVersion" "$\"${VERSIONMAJOR}.${VERSIONMINOR}.${VERSIONBUILD}$\""
;   WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "VersionMajor" ${VERSIONMAJOR}
;   WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "VersionMinor" ${VERSIONMINOR}
  # There is no option for modifying or repairing the install
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "NoRepair" 1
  # Set the INSTALLSIZE constant (!defined at the top of this script) so Add/Remove Programs can accurately report the size
;   WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "EstimatedSize" ${INSTALLSIZE}

sectionEnd

# Uninstaller

function un.onInit
  SetShellVarContext all

  #Verify the uninstaller - last chance to back out
  MessageBox MB_OKCANCEL "Permanantly remove ${APPNAME}?" IDOK next
    Abort
  next:
  !insertmacro VerifyUserIsAdmin
functionEnd

section "uninstall"

  # Remove Start Menu launcher
  delete "$SMPROGRAMS\${APPNAME}.lnk"
  # Try to remove the Start Menu folder - this will only happen if it is empty
  rmDir "$SMPROGRAMS\${APPNAME}"

  # Always delete uninstaller as the last action
  delete $INSTDIR\uninstall.exe

  # Try to remove the install directory
  rmDir /r $INSTDIR

  # Remove uninstaller information from the registry
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}"
sectionEnd