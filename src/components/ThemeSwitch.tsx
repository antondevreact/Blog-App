import { FC } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export const ThemeSwitch: FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={cn(
          "w-5 h-5",
          resolvedTheme === "light" ? "text-yellow-500" : "text-gray-500"
        )}
        aria-label="Light mode"
      />

      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Switch theme"
      />

      <Moon
        className={cn(
          "w-5 h-5",
          resolvedTheme === "dark" ? "fill-white" : "fill-none text-gray-500"
        )}
        aria-label="Dark mode"
      />
    </div>
  );
};
