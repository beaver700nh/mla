{ pkgs }: {
  deps = [
    pkgs.wget
    pkgs.palemoon
    pkgs.nano
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
    pkgs.python38
  ];
}
