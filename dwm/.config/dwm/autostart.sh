#!/bin/bash

isalive ()
{
    pgrep -x $1 &> /dev/null 
}

userresources=$HOME/.Xresources
usermodmap=$HOME/.Xmodmap
sysresources=/etc/X11/xinit/.Xresources
sysmodmap=/etc/X11/xinit/.Xmodmap

# merge in defaults and keymaps

if [ -f $sysresources ]; then
    xrdb -merge $sysresources
fi

if [ -f $sysmodmap ]; then
    xmodmap $sysmodmap
fi

if [ -f "$userresources" ]; then
    xrdb -merge "$userresources"
fi

if [ -f "$usermodmap" ]; then
    xmodmap "$usermodmap"
fi

# start some nice programs

if [ -d /etc/X11/xinit/xinitrc.d ] ; then
    for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
        [ -x "$f" ] && . "$f"
    done
    unset f
fi

60*
nitrogen --restore &
xset -b &
xset dpms 120 120 120 &
dunst &

isalive sxhkd || sxhkd -c $HOME/.config/sxhkd/sxhkdrc $HOME/.config/sxhkd/dwm &
isalive xautolock || xautolock -detectsleep -time 20 -locker 'systemctl suspend' & 
isalive low-bat.sh || low-bat.sh & 
isalive nm-applet || nm-applet & 
isalive warpd || warpd &
isalive Telegram || Telegram &
isalive thunderbird || thunderbird &

isalive pcmanfm || pcmanfm -d &
isalive xcompmgr || xcompmgr -f &
isalive conky || conky -c ~/.config/conky.conf &> /dev/null &
# isalive picom || picom -b 
# isalive xfce4-power-manager || xfce4-power-manager &
