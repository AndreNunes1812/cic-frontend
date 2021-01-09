import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Vendedor from './pages/Vendedor';
import Catalagos from './pages/Catalagos'
import Pages from './pages'


import FiltrosVendedor from './pages/Vendedor/Filtro'
/*
import FiltrosProfissional from './pages/Cadastros/Profissional/Filtro'
import FiltrosProfissao from './pages/Cadastros/Profissao/Filtro'
import FiltrosSegmento from './pages/Cadastros/Segmento/Filtro'
import FiltrosTPSegmento from './pages/Cadastros/TipoSegmento/Filtro';
import FiltrosCliente from './pages/Cadastros/Cliente/Filtro';
import FiltrosAuxiliar from './pages/Cadastros/Auxiliar/Filtro';

import FiltrosServicos from './pages/Servicos/servico/Filtro';
import FiltrosConta from './pages/Servicos/conta/Filtro'
*/
const Routes = () => (
  
    <Switch >   
        <Route exact path="/" component={Pages} />   
        <Route exact path="/vendedor" component={Vendedor} />   
        <Route exact path="/vendedor/:id" component={Vendedor} />   
       
        <Route exact path="/filtrovendedor" component={FiltrosVendedor} />   


        <Route exact path="/catalagos" component={Catalagos} />   
                    

        <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>  
)

export default Routes;