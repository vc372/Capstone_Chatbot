import pickle

class CustomUnpickler(pickle.Unpickler):

    def find_class(self, module, name):
        if name == 'anything':
            from load_nn_model import anything
            return anything
        return super().find_class(module, name)