package com.example.erp_system.exception;

public class CustomExceptions {

    public static class ClientNotFoundException extends RuntimeException {
        public ClientNotFoundException(String message) {
            super(message);
        }
    }

    public static class ClientCreationException extends RuntimeException {
        public ClientCreationException(String message) {
            super(message);
        }
    }

    public static class EmployerNotFoundException extends RuntimeException {
        public EmployerNotFoundException(String message) {
            super(message);
        }
    }

    public static class EmployerCreationException extends RuntimeException {
        public EmployerCreationException(String message) {
            super(message);
        }
    }

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class UserCreationException extends RuntimeException {
        public UserCreationException(String message) {
            super(message);
        }
    }

    public static class DataIntegrityViolationException extends RuntimeException {
        private final Throwable rootCause;

        public DataIntegrityViolationException(String message, Throwable rootCause) {
            super(message);
            this.rootCause = rootCause;
        }

        public Throwable getRootCause() {
            return rootCause;
        }
    }

    public static class CategoryNotFoundException extends RuntimeException {
        public CategoryNotFoundException(String message) {
            super(message);
        }
    }

    public static class CategoryCreationException extends RuntimeException {
        public CategoryCreationException(String message) {
            super(message);
        }
    }

    public static class ItemsNotFoundException extends RuntimeException {
        public ItemsNotFoundException(String message) {
            super(message);
        }
    }

    public static class ItemsCreationException extends RuntimeException {
        public ItemsCreationException(String message) {
            super(message);
        }
    }

    public static class OrderStatusNotFoundException extends RuntimeException {
        public OrderStatusNotFoundException(String message) {
            super(message);
        }
    }

    public static class OrderStatusCreationException extends RuntimeException {
        public OrderStatusCreationException(String message) {
            super(message);
        }
    }

    public static class OrderNotFoundException extends RuntimeException {
        public OrderNotFoundException(String message) {
            super(message);
        }
    }

    public static class OrderCreationException extends RuntimeException {
        public OrderCreationException(String message) {
            super(message);
        }
    }

    public static class OrderUpdateException extends RuntimeException {
        public OrderUpdateException(String message) {
            super(message);
        }
    }

    public static class OrderItemNotFoundException extends RuntimeException {
        public OrderItemNotFoundException(String message) {
            super(message);
        }
    }

    public static class OrderItemCreationException extends RuntimeException {
        public OrderItemCreationException(String message) {
            super(message);
        }
    }

    public static class OrderItemUpdateException extends RuntimeException {
        public OrderItemUpdateException(String message) {
            super(message);
        }
    }
}
