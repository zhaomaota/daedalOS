import { useMenu } from "contexts/menu";
import type {
  ContextMenuCapture,
  MenuItem,
} from "contexts/menu/useMenuContextState";
import { useProcesses } from "contexts/process";
import { useCallback } from "react";
import { MENU_SEPERATOR } from "utils/constants";
import { toggleFullScreen, toggleShowDesktop } from "utils/functions";

const useTaskbarContextMenu = (onStartButton = false): ContextMenuCapture => {
  const { contextMenu } = useMenu();
  const { minimize, open, processes = {} } = useProcesses();
  const getItems = useCallback(() => {
    const processArray = Object.entries(processes);
    const allWindowsMinimized =
      processArray.length > 0 &&
      !processArray.some(([, { minimized }]) => !minimized);
    const toggleLabel = allWindowsMinimized
      ? "Show open windows"
      : "Show the desktop";
    const menuItems: MenuItem[] = [
      {
        action: () => toggleShowDesktop(processes, minimize),
        label: onStartButton ? "Desktop" : toggleLabel,
      },
    ];

    if (onStartButton) {
      menuItems.unshift(
        {
          action: () => open("Terminal"),
          label: "Command Prompt",
        },
        MENU_SEPERATOR,
        {
          action: () => open("FileExplorer"),
          label: "File Explorer",
        },
        {
          action: () => open("Run"),
          label: "Run",
        },
        MENU_SEPERATOR
      );
    } else {
      menuItems.unshift(
        {
          action: toggleFullScreen,
          label: document.fullscreenElement
            ? "Exit full screen"
            : "Enter full screen",
        },
        MENU_SEPERATOR
      );
    }

    return menuItems;
  }, [minimize, onStartButton, open, processes]);

  return contextMenu?.(getItems);
};

export default useTaskbarContextMenu;
