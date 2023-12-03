#!/bin/sh -eu
cat <<EOF
window.__ENV = {
  NEXT_PUBLIC_API_BASE_URL: "$NEXT_PUBLIC_API_BASE_URL",
};
EOF
