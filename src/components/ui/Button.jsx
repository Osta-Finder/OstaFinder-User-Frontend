import { Button } from "@headlessui/react";
import clsx from "clsx";

export default function CuButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      className={clsx("rounded px-4 py-2 text-sm text-white btn-custom")}
    >
      {children}
    </Button>
  );
}
